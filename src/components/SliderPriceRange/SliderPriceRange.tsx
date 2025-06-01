import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { resetArrivalSlice } from '../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../redux/departureSlice';
import { setMinPrice, setMaxPrice } from '../../redux/paramsSlice';
import { fetchLastTickets } from '../../redux/lastTicketsSlice';
import { fetchTrains } from '../../redux/trainsSlice';
import './sliderPriceRange.css';

const SliderPriceRange = () => {
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

  const minRange = 0; // min значение диапазона = 0
  const maxRange = 7_000; // max значение диапазона = 7_000
  const sliderWidth = 294; // 294px
  const thumbRadius = 12; // т.к. диаметр ползунка = 24px, то его радиус = 12px

  // обработчик изменения минимальной стоимости билета:
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice =
      Number(event.target.value) < maxPrice
        ? Number(event.target.value)
        : maxPrice - 1_000; // минимальный диапазон - 1_000 рублей

    dispatch(setMinPrice(newPrice)); // обновляем minPrice в store
  };

  // обработчик изменения максимальной стоимости билета:
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice =
      Number(event.target.value) > minPrice
        ? Number(event.target.value)
        : minPrice + 1_000; // минимальный диапазон - 1_000 рублей

    dispatch(setMaxPrice(newPrice)); // обновляем maxPrice в store
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

  // вычисление позиции ползунков:
  const calculateSliderPositions = (
    lowerValue: number,
    upperValue: number,
    minRange: number,
    maxRange: number,
    sliderWidth: number,
    thumbRadius: number
  ) => {
    // преобразуем значения диапазона в проценты для позиционирования ползунков:
    // FIXME: почему-то диапазон между ползунками считается не равномерно...
    const lowerPercent =
      ((lowerValue - minRange) / (maxRange - minRange)) * 100;
    const upperPercent =
      ((upperValue - minRange) / (maxRange - minRange)) * 100;

    let left = lowerPercent; // значение left для левого ползунка
    let right = 100 - upperPercent; // значение right для правого ползунка

    // переводим радиус ползунка в проценты относительно ширины слайдера ~ 4.08%:
    const thumbRadiusPercent = (thumbRadius * 100) / sliderWidth;

    // проверяем правую границу:
    if (right < thumbRadiusPercent) {
      right = thumbRadiusPercent; // если она < 12px, то задаем её равной 12px
      // NOTE: костыли:
      left = left > 100 - thumbRadius * 4 ? left - thumbRadiusPercent : left; // изменяем левую
    }

    // проверяем левую границу:
    if (left < thumbRadiusPercent) {
      left = thumbRadiusPercent; // если она < 12px, то задаем её равной 12px
      // NOTE: костыли:
      right =
        right > 100 - thumbRadius * 4 ? right - thumbRadiusPercent : right; // изменяем правую
    }

    return { left, right };
  };

  // вычисление позиций ползунков:
  const { left, right } = calculateSliderPositions(
    minPrice,
    maxPrice,
    minRange,
    maxRange,
    sliderWidth,
    thumbRadius
  );

  // при изменении стоимости пересчитываем размер элемента span с актуальной ценой:
  useEffect(() => {
    // NOTE: по идее это не нужно...
    // обновляем позиции ползунков в состоянии:
    // setValuePosition({
    //   leftForValue: left,
    //   rightForValue: right,
    // });

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
    <div className="slider-price-range">
      {/* Фоновая полоса */}
      <div
        className="slider-price-range__fill"
        style={{
          left: `${left}%`, // позиция начала полосы
          right: `${right}%`, // позиция конца полосы
        }}
      ></div>

      {/* Левый ползунок */}
      <input
        className="slider-price-range__lower"
        type="range"
        id="lower"
        min="0"
        max="7000"
        step="100"
        onChange={handleMinChange}
        onMouseUp={handleMouseUp}
        value={minPrice}
      />

      {/* Значение под левым ползунком */}
      <span
        ref={leftValueRef}
        className="slider-price-range__min-value"
        style={{
          left: `${leftForValue}%`,
        }}
      >
        {minPrice}
      </span>

      {/* Правый ползунок */}
      <input
        className="slider-price-range__upper"
        type="range"
        id="upper"
        min="0"
        max="7000"
        step="100"
        onChange={handleMaxChange}
        onMouseUp={handleMouseUp}
        value={maxPrice}
      />

      {/* Значение под правым ползунком */}
      <span
        ref={rightValueRef}
        className="slider-price-range__max-value"
        style={{
          right: `${rightForValue}%`,
        }}
      >
        {maxPrice}
      </span>
    </div>
  );
};

export default SliderPriceRange;
