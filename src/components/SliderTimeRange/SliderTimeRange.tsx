import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { resetArrivalSlice } from '../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../redux/departureSlice';
import {
  setStartDepartureHourFrom,
  setStartDepartureHourTo,
  setEndDepartureHourFrom,
  setEndDepartureHourTo,
  setStartArrivalHourFrom,
  setStartArrivalHourTo,
  setEndArrivalHourFrom,
  setEndArrivalHourTo,
} from '../../redux/paramsSlice';
import { fetchLastTickets } from '../../redux/lastTicketsSlice';
import { fetchTrains } from '../../redux/trainsSlice';
import './sliderTimeRange.css';

interface ISliderTimeRangeProps {
  destination: 'forward' | 'backward';
  type: 'departure' | 'arrival';
}

const SliderTimeRange = ({ destination, type }: ISliderTimeRangeProps) => {
  const location = useLocation(); // например, '/trains'
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const {
    paramStartTown,
    paramEndTown,
    paramStartDate,
    paramEndDate,
    minPrice,
    maxPrice,
    startDepartureHourFrom,
    startDepartureHourTo,
    endDepartureHourFrom,
    endDepartureHourTo,
    startArrivalHourFrom,
    startArrivalHourTo,
    endArrivalHourFrom,
    endArrivalHourTo,
    haveFirstClass,
    haveSecondClass,
    haveThirdClass,
    haveFourthClass,
    haveWifi,
    haveExpress,
  } = useSelector((state: RootState) => state.params);

  const leftValueRef = useRef<HTMLSpanElement>(null); // ссылка на левый span
  const rightValueRef = useRef<HTMLSpanElement>(null); // ссылка на правый span

  const [valuePosition, setValuePosition] = useState({
    leftForValue: 0, // позиционирование левого span
    rightForValue: 0, // позиционирование правого span
  });
  const { leftForValue, rightForValue } = valuePosition; // деструктурирование

  const minRange = 0; // допустимое минимальное значение
  const maxRange = 24; // допустимое максимальное значение
  const sliderWidth = 300;

  let lowerValue: number;
  let upperValue: number;

  // Динамически изменяем диапазоны в зависимости от полученных пропсов:
  if (destination === 'forward') {
    lowerValue =
      type === 'departure' ? startDepartureHourFrom : startArrivalHourFrom;
    upperValue =
      type === 'departure' ? startDepartureHourTo : startArrivalHourTo;
  } else {
    lowerValue =
      type === 'departure' ? endDepartureHourFrom : endArrivalHourFrom;
    upperValue = type === 'departure' ? endDepartureHourTo : endArrivalHourTo;
  }

  // 1. Преобразуем значения диапазона в проценты для позиционирования ползунков:
  // FIXME: почему-то диапазон между ползунками считается не равномерно...
  const lowerPercent = ((lowerValue - minRange) / (maxRange - minRange)) * 100;
  const upperPercent = ((upperValue - minRange) / (maxRange - minRange)) * 100;

  // 2. Вычисляем положение ползунков:
  const left = lowerPercent; // Значение left для левого ползунка
  const right = 100 - upperPercent; // Значение right для правого ползунка

  // обработчик изменения минимального часа:
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHour =
      Number(event.target.value) < upperValue
        ? Number(event.target.value)
        : upperValue - 5; // минимальный диапазон - 5 часов

    // обновляем минимальный час в store:
    if (destination === 'forward') {
      dispatch(
        type === 'departure'
          ? setStartDepartureHourFrom(newHour)
          : setStartArrivalHourFrom(newHour)
      );
    } else {
      dispatch(
        type === 'departure'
          ? setEndDepartureHourFrom(newHour)
          : setEndArrivalHourFrom(newHour)
      );
    }
  };

  // обработчик изменения максимального часа:
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHour =
      Number(event.target.value) > lowerValue
        ? Number(event.target.value)
        : lowerValue + 5; // минимальный диапазон - 5 часов

    // обновляем максимальный час в store:
    if (destination === 'forward') {
      dispatch(
        type === 'departure'
          ? setStartDepartureHourTo(newHour)
          : setStartArrivalHourTo(newHour)
      );
    } else {
      dispatch(
        type === 'departure'
          ? setEndDepartureHourTo(newHour)
          : setEndArrivalHourTo(newHour)
      );
    }
  };

  // отправка запроса только ПОСЛЕ отпускания ползунка:
  const handleMouseUp = () => {
    if (!paramStartTown || !paramEndTown || !paramStartDate || !paramEndDate) {
      return;
    }

    const requestOptions = {
      from_city_id: paramStartTown._id,
      to_city_id: paramEndTown._id,
      date_start: format(paramStartDate, 'yyyy-MM-dd'),
      date_end: format(paramEndDate, 'yyyy-MM-dd'),
      minPrice,
      maxPrice,
      startDepartureHourFrom,
      startDepartureHourTo,
      endDepartureHourFrom,
      endDepartureHourTo,
      startArrivalHourFrom,
      startArrivalHourTo,
      endArrivalHourFrom,
      endArrivalHourTo,
      firstClass: haveFirstClass,
      secondClass: haveSecondClass,
      thirdClass: haveThirdClass,
      fourthClass: haveFourthClass,
      wifi: haveWifi,
      express: haveExpress,
    };

    // отправляем поисковый запрос на сервер с обновленными данными:
    dispatch(fetchTrains(requestOptions));

    // если мы находимся НЕ на роуте '/trains' (т.е. мы находимся на роуте '/seats'):
    if (location.pathname !== '/trains') {
      // чистим слайсы 'arrival' и 'departure', чтобы не было багов (остальное можно не чистить):
      dispatch(resetArrivalSlice()); // очистка redux-store по ключу 'arrival'
      dispatch(resetDepartureSlice()); // очистка redux-store по ключу 'departure'

      // после очистки redux-store переходим на нужный роут -> '/trains':
      dispatch(fetchLastTickets()); // запрос на последние билеты
      navigate('/trains'); // меняем роут только после всех действий !!!
    }
  };

  // при изменении времени пересчитываем размер элемента span с актуальной ценой:
  useEffect(() => {
    // NOTE: по идее это не нужно...
    // Обновляем позиции ползунков в локальном стейт:
    // setValuePosition((prevState) => ({
    //   ...prevState,
    //   leftForValue: left,
    //   rightForValue: right,
    // }));

    // если ссылка на левый span уже установлена:
    if (leftValueRef.current) {
      const leftWidth = leftValueRef.current.offsetWidth; // актуальная ширина левого span
      let leftValuePosition = left - ((leftWidth / 2) * 100) / sliderWidth; // сдвиг влево (1/2)
      leftValuePosition = leftValuePosition < 0 ? 0 : leftValuePosition; // но не слишком :)

      // меняем локально стейт с положением левого span:
      setValuePosition((prevState) => ({
        ...prevState,
        leftForValue: leftValuePosition,
      }));
    }

    // если ссылка на правый span уже установлена:
    if (rightValueRef.current) {
      const rightWidth = rightValueRef.current.offsetWidth; // актуальная ширина правого span
      let rightValuePosition = right - ((rightWidth / 2) * 100) / sliderWidth; // сдвиг вправо (1/2)
      rightValuePosition = rightValuePosition < 0 ? 0 : rightValuePosition; // но не слишком :)

      // меняем локально стейт с положением правого span:
      setValuePosition((prevState) => ({
        ...prevState,
        rightForValue: rightValuePosition,
      }));
    }
  }, [left, right]);

  return (
    <>
      <div className="slider-time-range">
        {/* Фоновая полоса */}
        <div
          className="slider-time-range__fill"
          style={{
            left: `${left}%`, // позиция начала полосы
            right: `${right}%`, // позиция конца полосы
          }}
        ></div>

        {/* Левый ползунок */}
        <input
          className="slider-time-range__lower"
          type="range"
          id="lower"
          min="0"
          max="24"
          step="1"
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          value={lowerValue}
        />

        {/* Значение под левым ползунком */}
        <span
          ref={leftValueRef}
          className="slider-time-range__min-value"
          style={{
            left: `${leftForValue}%`,
          }}
        >
          {lowerValue + ':00'}
        </span>

        {/* Правый ползунок */}
        <input
          className="slider-time-range__upper"
          type="range"
          id="upper"
          min="0"
          max="24"
          step="1"
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          value={upperValue}
        />

        {/* Значение под правым ползунком */}
        <span
          ref={rightValueRef}
          className="slider-time-range__max-value"
          style={{
            right: `${rightForValue}%`,
          }}
        >
          {upperValue + ':00'}
        </span>
      </div>
    </>
  );
};

export default SliderTimeRange;
