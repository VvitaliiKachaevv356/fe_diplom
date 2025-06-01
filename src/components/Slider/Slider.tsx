import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { AppDispatch, RootState } from '../../redux/store';
import { resetArrivalSlice } from '../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../redux/departureSlice';
import {
  setFirstClass,
  setSecondClass,
  setThirdClass,
  setFourthClass,
  setWifi,
  setExpress,
} from '../../redux/paramsSlice';
import { fetchLastTickets } from '../../redux/lastTicketsSlice';
import { fetchTrains } from '../../redux/trainsSlice';

import './slider.css';

const Slider = ({ forId }: { forId: string }) => {
  const location = useLocation();
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

  // маппинг для состояния слайдера:
  const sliderStateMap: { [key: string]: boolean } = {
    'slider-lux': haveFirstClass,
    'slider-compartment': haveSecondClass,
    'slider-platzkart': haveThirdClass,
    'slider-seat': haveFourthClass,
    'slider-wiFi': haveWifi,
    'slider-express': haveExpress,
  };

  // локальное состояние для слайдера (используем маппинг):
  const [isChecked, setIsChecked] = useState<boolean>(
    sliderStateMap[forId] || false
  );

  // маппинг для dispatch:
  const dispatchMap: { [key: string]: (checked: boolean) => void } = {
    'slider-lux': (checked: boolean) => dispatch(setFirstClass(checked)),
    'slider-compartment': (checked: boolean) =>
      dispatch(setSecondClass(checked)),
    'slider-platzkart': (checked: boolean) => dispatch(setThirdClass(checked)),
    'slider-seat': (checked: boolean) => dispatch(setFourthClass(checked)),
    'slider-wiFi': (checked: boolean) => dispatch(setWifi(checked)),
    'slider-express': (checked: boolean) => dispatch(setExpress(checked)),
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    // вызов функции из dispatchMap с аргументом checked:
    dispatchMap[forId]?.(checked);

    if (!paramStartTown || !paramEndTown || !paramStartDate || !paramEndDate) {
      return;
    }

    // параметры для запроса на сервер:
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

      firstClass: forId === 'slider-lux' ? checked : haveFirstClass,
      secondClass: forId === 'slider-compartment' ? checked : haveSecondClass,
      thirdClass: forId === 'slider-platzkart' ? checked : haveThirdClass,
      fourthClass: forId === 'slider-seat' ? checked : haveFourthClass,

      wifi: forId === 'slider-wiFi' ? checked : haveWifi,
      express: forId === 'slider-express' ? checked : haveExpress,
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

  return (
    <div className="slider">
      <input
        type="checkbox"
        id={forId}
        className="slider__checkbox"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor={forId} className="slider__label">
        <span className="slider__toggle"></span>
      </label>
    </div>
  );
};

export default Slider;
