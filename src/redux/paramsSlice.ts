import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITown } from '../models/models';

interface IParamsSliceState {
  paramStartTown: ITown | null;
  paramEndTown: ITown | null;

  paramStartDate: Date | null;
  paramEndDate: Date | null;

  minPrice: number;
  maxPrice: number;

  startDepartureHourFrom: number;
  startDepartureHourTo: number;
  endDepartureHourFrom: number;
  endDepartureHourTo: number;

  startArrivalHourFrom: number;
  startArrivalHourTo: number;
  endArrivalHourFrom: number;
  endArrivalHourTo: number;

  haveFirstClass: boolean;
  haveSecondClass: boolean;
  haveThirdClass: boolean;
  haveFourthClass: boolean;

  haveWifi: boolean;
  haveExpress: boolean;
}

const initialState: IParamsSliceState = {
  paramStartTown: null,
  paramEndTown: null,

  paramStartDate: null,
  paramEndDate: null,

  minPrice: 0,
  maxPrice: 7000,

  startDepartureHourFrom: 0,
  startDepartureHourTo: 24,
  endDepartureHourFrom: 0,
  endDepartureHourTo: 24,

  startArrivalHourFrom: 0,
  startArrivalHourTo: 24,
  endArrivalHourFrom: 0,
  endArrivalHourTo: 24,

  haveFirstClass: false,
  haveSecondClass: false,
  haveThirdClass: false,
  haveFourthClass: false,

  haveWifi: false,
  haveExpress: false,
};

const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    resetParamsSlice: (state) => {
      state.paramStartTown = initialState.paramStartTown;
      state.paramEndTown = initialState.paramEndTown;
      state.paramStartDate = initialState.paramStartDate;
      state.paramEndDate = initialState.paramEndDate;

      state.minPrice = initialState.minPrice;
      state.maxPrice = initialState.maxPrice;

      state.startDepartureHourFrom = initialState.startDepartureHourFrom;
      state.startDepartureHourTo = initialState.startDepartureHourTo;
      state.endDepartureHourFrom = initialState.endDepartureHourFrom;
      state.endDepartureHourTo = initialState.endDepartureHourTo;

      state.startArrivalHourFrom = initialState.startArrivalHourFrom;
      state.startArrivalHourTo = initialState.startArrivalHourTo;
      state.endArrivalHourFrom = initialState.endArrivalHourFrom;
      state.endArrivalHourTo = initialState.endArrivalHourTo;

      state.haveFirstClass = initialState.haveFirstClass;
      state.haveSecondClass = initialState.haveSecondClass;
      state.haveThirdClass = initialState.haveThirdClass;
      state.haveFourthClass = initialState.haveFourthClass;

      state.haveWifi = initialState.haveWifi;
      state.haveExpress = initialState.haveExpress;
    },
    setParamStartTown: (state, action: PayloadAction<ITown | null>) => {
      state.paramStartTown = action.payload;
    },
    setParamEndTown: (state, action: PayloadAction<ITown | null>) => {
      state.paramEndTown = action.payload;
    },

    setParamStartDate: (state, action: PayloadAction<Date | null>) => {
      state.paramStartDate = action.payload;
    },
    setParamEndDate: (state, action: PayloadAction<Date | null>) => {
      state.paramEndDate = action.payload;
    },

    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },

    setStartDepartureHourFrom: (state, action: PayloadAction<number>) => {
      state.startDepartureHourFrom = action.payload;
    },
    setStartDepartureHourTo: (state, action: PayloadAction<number>) => {
      state.startDepartureHourTo = action.payload;
    },
    setEndDepartureHourFrom: (state, action: PayloadAction<number>) => {
      state.endDepartureHourFrom = action.payload;
    },
    setEndDepartureHourTo: (state, action: PayloadAction<number>) => {
      state.endDepartureHourTo = action.payload;
    },

    setStartArrivalHourFrom: (state, action: PayloadAction<number>) => {
      state.startArrivalHourFrom = action.payload;
    },
    setStartArrivalHourTo: (state, action: PayloadAction<number>) => {
      state.startArrivalHourTo = action.payload;
    },
    setEndArrivalHourFrom: (state, action: PayloadAction<number>) => {
      state.endArrivalHourFrom = action.payload;
    },
    setEndArrivalHourTo: (state, action: PayloadAction<number>) => {
      state.endArrivalHourTo = action.payload;
    },

    setFirstClass: (state, action: PayloadAction<boolean>) => {
      state.haveFirstClass = action.payload;
    },
    setSecondClass: (state, action: PayloadAction<boolean>) => {
      state.haveSecondClass = action.payload;
    },
    setThirdClass: (state, action: PayloadAction<boolean>) => {
      state.haveThirdClass = action.payload;
    },
    setFourthClass: (state, action: PayloadAction<boolean>) => {
      state.haveFourthClass = action.payload;
    },

    setWifi: (state, action: PayloadAction<boolean>) => {
      state.haveWifi = action.payload;
    },
    setExpress: (state, action: PayloadAction<boolean>) => {
      state.haveExpress = action.payload;
    },
  },
});

export const {
  resetParamsSlice,
  setParamStartTown,
  setParamEndTown,
  setParamStartDate,
  setParamEndDate,
  setMinPrice,
  setMaxPrice,
  setStartDepartureHourFrom,
  setStartDepartureHourTo,
  setEndDepartureHourFrom,
  setEndDepartureHourTo,
  setStartArrivalHourFrom,
  setStartArrivalHourTo,
  setEndArrivalHourFrom,
  setEndArrivalHourTo,
  setFirstClass,
  setSecondClass,
  setThirdClass,
  setFourthClass,
  setWifi,
  setExpress,
} = paramsSlice.actions;
export default paramsSlice.reducer;
