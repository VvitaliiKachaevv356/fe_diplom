import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { addDays, format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";

import { AppDispatch, RootState } from "../../../../redux/store";
import { resetArrivalSlice } from "../../../../redux/arrivalSlice";
import { resetDepartureSlice } from "../../../../redux/departureSlice";
import {
  setParamEndDate,
  setParamStartDate,
} from "../../../../redux/paramsSlice";
import {
  setEndDate,
  setEndDateTooltip,
  setStartDate,
  setStartDateTooltip,
} from "../../../../redux/searchFormSlice";
import { fetchLastTickets } from "../../../../redux/lastTicketsSlice";
import { fetchTrains } from "../../../../redux/trainsSlice";

import Tooltip from "../../../UI/other/Tooltip/Tooltip";

import "react-datepicker/dist/react-datepicker.css";
import "./myDatePicker.css";

interface IMyDatePickerProps {
  isStart: boolean;
  isInForm: boolean;
}

const MyDatePicker = ({ isStart, isInForm }: IMyDatePickerProps) => {
  const navigate = useNavigate();

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const refIcon = useRef<HTMLSpanElement>(null);

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

  const selectDate = () => {
    if (isStart) {
      return isInForm ? startDate : paramStartDate;
    }
    return isInForm ? endDate : paramEndDate;
  };

  const handleStartDateChange = (date: Date | null) => {
    if (isInForm) {
      if (date && endDate && !isSameDay(date, endDate) && date > endDate) {
        date = null;
      }

      dispatch(setStartDateTooltip(date ? "" : "Пожалуйста, выберите дату"));
      dispatch(setStartDate(date));
      return;
    }

    if (
      paramStartTown &&
      paramEndTown &&
      date &&
      paramStartDate &&
      paramEndDate &&
      (date < paramEndDate || isSameDay(date, paramEndDate)) &&
      !isSameDay(date, paramStartDate)
    ) {
      dispatch(setStartDate(date));
      dispatch(setParamStartDate(date));

      const requestOptions = {
        from_city_id: paramStartTown._id,
        to_city_id: paramEndTown._id,
        date_start: format(date, "yyyy-MM-dd"),
        date_end: format(paramEndDate, "yyyy-MM-dd"),
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

      dispatch(fetchTrains(requestOptions));

      if (location.pathname !== "/trains") {
        dispatch(resetArrivalSlice());
        dispatch(resetDepartureSlice());
        dispatch(fetchLastTickets());
        navigate("/trains");
      }
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (isInForm) {
      if (
        date &&
        startDate &&
        !isSameDay(date, startDate) &&
        date < startDate
      ) {
        date = null;
      }

      dispatch(setEndDateTooltip(date ? "" : "Пожалуйста, выберите дату"));
      dispatch(setEndDate(date));
      return;
    }

    if (
      paramStartTown &&
      paramEndTown &&
      date &&
      paramStartDate &&
      paramEndDate &&
      (date > paramStartDate || isSameDay(date, paramStartDate)) &&
      !isSameDay(date, paramEndDate)
    ) {
      dispatch(setEndDate(date));
      dispatch(setParamEndDate(date));

      const requestOptions = {
        from_city_id: paramStartTown._id,
        to_city_id: paramEndTown._id,
        date_start: format(paramStartDate, "yyyy-MM-dd"),
        date_end: format(date, "yyyy-MM-dd"),
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

      dispatch(fetchTrains(requestOptions));

      if (location.pathname !== "/trains") {
        dispatch(resetArrivalSlice());
        dispatch(resetDepartureSlice());
        dispatch(fetchLastTickets());
        navigate("/trains");
      }
    }
  };

  const checkStartDateOnBlur = () => {
    dispatch(setStartDateTooltip(startDate ? "" : "Пожалуйста, выберите дату"));
  };

  const checkEndDateOnBlur = () => {
    dispatch(setEndDateTooltip(endDate ? "" : "Пожалуйста, выберите дату"));
  };

  const handleIconClick = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleOutsideClick = (event: any) => {
    if (event.target !== refIcon.current) {
      setCalendarOpen(false);
    }
  };

  const handleInputClick = () => {
    setCalendarOpen(true);
  };

  return (
    <div className="date-picker">
      <DatePicker
        className="date-picker__component"
        locale={ru}
        dateFormat="dd.MM.yy"
        placeholderText="ДД.ММ.ГГ"
        minDate={new Date()}
        maxDate={addDays(new Date(), 365)}
        selected={selectDate()}
        onBlur={isStart ? checkStartDateOnBlur : checkEndDateOnBlur}
        onChange={isStart ? handleStartDateChange : handleEndDateChange}
        onClickOutside={handleOutsideClick}
        onSelect={() => setCalendarOpen(false)}
        open={calendarOpen}
        onInputClick={handleInputClick}
      />

      <span
        className="date-picker__icon"
        onClick={handleIconClick}
        ref={refIcon}
      ></span>
      <Tooltip text={isStart ? startDateTooltip : endDateTooltip} />
    </div>
  );
};

export default MyDatePicker;
