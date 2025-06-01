import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker'; // библиотека react-datepicker -> календарь
import { addDays, format, isSameDay } from 'date-fns'; // библиотека date-fns -> валидация даты
import { ru } from 'date-fns/locale';

import { AppDispatch, RootState } from '../../redux/store';
import { resetArrivalSlice } from '../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../redux/departureSlice';
import { setParamEndDate, setParamStartDate } from '../../redux/paramsSlice';
import {
  setEndDate,
  setEndDateTooltip,
  setStartDate,
  setStartDateTooltip,
} from '../../redux/searchFormSlice';
import { fetchLastTickets } from '../../redux/lastTicketsSlice';
import { fetchTrains } from '../../redux/trainsSlice';

import Tooltip from '../Tooltip/Tooltip';

import 'react-datepicker/dist/react-datepicker.css';
import './myDatePicker.css';

interface IMyDatePickerProps {
  isStart: boolean;
  isInForm: boolean;
}

const MyDatePicker = ({ isStart, isInForm }: IMyDatePickerProps) => {
  const navigate = useNavigate();

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false); // state для календаря
  const refIcon = useRef<HTMLSpanElement>(null); // рефка на иконку календаря

  const dispatch: AppDispatch = useDispatch();

  const { startDate, endDate, startDateTooltip, endDateTooltip } = useSelector(
    (state: RootState) => state.searchForm
  );

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

  // функция, определяющая какую именно дату подставлять в selected:
  const selectDate = () => {
    if (isStart) {
      return isInForm ? startDate : paramStartDate;
    }
    return isInForm ? endDate : paramEndDate;
  };

  // обработчик изменения даты отправления:
  // NB! дата либо валидна, либо её нет вовсе - валидность проверяет сам DatePicker!
  const handleStartDateChange = (date: Date | null) => {
    // если `MyDatePicker` находится ВНУТРИ формы, то sidebar НЕ обновляем БЕЗ submit-а:
    if (isInForm) {
      // если дата отправления позже даты возврата, то сбрасываем дату отправления:
      if (date && endDate && !isSameDay(date, endDate) && date > endDate) {
        date = null;
      }

      dispatch(setStartDateTooltip(date ? '' : 'Пожалуйста, выберите дату'));
      dispatch(setStartDate(date)); // изменяем дату отправления ТОЛЬКО в форме
      return;
    }

    // если `MyDatePicker` находится НЕ внутри формы, а в sidebar-е:
    // если всё ok (есть обе даты, возврат - после отправления или в один день и дата изменилась):
    if (
      paramStartTown &&
      paramEndTown &&
      date &&
      paramStartDate &&
      paramEndDate &&
      (date < paramEndDate || isSameDay(date, paramEndDate)) &&
      !isSameDay(date, paramStartDate)
    ) {
      // изменяем дату отправления И в форме И в sidebar-е:
      dispatch(setStartDate(date));
      dispatch(setParamStartDate(date));

      const requestOptions = {
        from_city_id: paramStartTown._id,
        to_city_id: paramEndTown._id,

        date_start: format(date, 'yyyy-MM-dd'),
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

      // отправляем поисковый запрос на сервер с новой датой (date)
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
    }
  };

  // обработчик изменения даты возвращения:
  // NB! дата либо валидна, либо её нет вовсе - валидность проверяет сам DatePicker!
  const handleEndDateChange = (date: Date | null) => {
    // если `MyDatePicker` находится ВНУТРИ формы, то sidebar НЕ обновляем БЕЗ submit-а:
    if (isInForm) {
      // если дата возврата раньше даты отправления, то сбрасываем дату возврата:
      if (
        date &&
        startDate &&
        !isSameDay(date, startDate) &&
        date < startDate
      ) {
        date = null;
      }

      dispatch(setEndDateTooltip(date ? '' : 'Пожалуйста, выберите дату'));
      dispatch(setEndDate(date)); // изменяем дату отправления ТОЛЬКО в форме
      return;
    }

    // если `MyDatePicker` находится НЕ внутри формы, а в sidebar-е:
    // если всё ok (есть обе даты, а возврат - после отправления или в один день и дата изменилась):
    if (
      paramStartTown &&
      paramEndTown &&
      date &&
      paramStartDate &&
      paramEndDate &&
      (date > paramStartDate || isSameDay(date, paramStartDate)) &&
      !isSameDay(date, paramEndDate)
    ) {
      // изменяем дату отправления И в форме И в sidebar-е:
      dispatch(setEndDate(date));
      dispatch(setParamEndDate(date));

      const requestOptions = {
        from_city_id: paramStartTown._id,
        to_city_id: paramEndTown._id,

        date_start: format(paramStartDate, 'yyyy-MM-dd'),
        date_end: format(date, 'yyyy-MM-dd'),

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

      // отправляем поисковый запрос на сервер с новой датой (date)
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
    }
  };

  // проверка даты отправления на null при потере фокуса (если не возникло событие onChange):
  const checkStartDateOnBlur = () => {
    dispatch(setStartDateTooltip(startDate ? '' : 'Пожалуйста, выберите дату'));
  };

  // проверка даты возвращения на null при потере фокуса (если не возникло событие onChange):
  const checkEndDateOnBlur = () => {
    dispatch(setEndDateTooltip(endDate ? '' : 'Пожалуйста, выберите дату'));
  };

  // обработчик клика по иконке:
  const handleIconClick = () => {
    setCalendarOpen(!calendarOpen); // открываем/закрываем календарь
  };

  // обработчик клика за пределами DatePicker:
  // FIXME: как избавиться от any ???
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOutsideClick = (event: any) => {
    // (event: React.MouseEvent<Element, MouseEvent>) <- не совместимы типы event !!!
    // если клик за пределами DatePicker && не по иконке, то закрываем календарь
    if (event.target !== refIcon.current) {
      setCalendarOpen(false);
    }
  };

  return (
    <div className="date-picker">
      <DatePicker
        className="date-picker__component"
        locale={ru} // русский язык в календаре
        dateFormat="dd.MM.yy" // формат даты
        placeholderText="ДД.ММ.ГГ" // placeholder
        minDate={new Date()} // не раньше сегодняшнего дня
        maxDate={addDays(new Date(), 365)} // не позже, чем через год
        selected={selectDate()} // выбранная валидная дата или null
        onBlur={isStart ? checkStartDateOnBlur : checkEndDateOnBlur} // валидация при потере фокуса
        onChange={isStart ? handleStartDateChange : handleEndDateChange} // обработчик изм-ния даты
        onClickOutside={handleOutsideClick} // закрытие календаря при клике вне
        onSelect={() => setCalendarOpen(false)} // when day is clicked
        open={calendarOpen} // управление открытием календаря
      />

      {/* по клику на иконку открываем/закрываем календарь */}
      <span
        className="date-picker__icon"
        onClick={handleIconClick}
        ref={refIcon}
      ></span>

      {/* показываем подсказку если поле пустое или некорректное */}
      <Tooltip text={isStart ? startDateTooltip : endDateTooltip} />
    </div>
  );
};

export default MyDatePicker;
