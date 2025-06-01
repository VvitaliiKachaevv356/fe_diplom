import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITown } from '../models/models';

interface ISearchFormState {
  startTown: ITown | null;
  startTownTooltip: string;
  endTown: ITown | null;
  endTownTooltip: string;
  startDate: Date | null;
  startDateTooltip: string;
  endDate: Date | null;
  endDateTooltip: string;
}

const initialState: ISearchFormState = {
  startTown: null,
  startTownTooltip: '',
  endTown: null,
  endTownTooltip: '',
  startDate: null,
  startDateTooltip: '',
  endDate: null,
  endDateTooltip: '',
};

const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    resetSearchFormSlice: (state) => {
      state.startTown = initialState.startTown;
      state.startTownTooltip = initialState.startTownTooltip;
      state.endTown = initialState.endTown;
      state.endTownTooltip = initialState.endTownTooltip;
      state.startDate = initialState.startDate;
      state.startDateTooltip = initialState.startDateTooltip;
      state.endDate = initialState.endDate;
      state.endDateTooltip = initialState.endDateTooltip;
    },
    setStartTown: (state, action: PayloadAction<ITown | null>) => {
      state.startTown = action.payload;
    },
    setStartTownTooltip: (state, action: PayloadAction<string>) => {
      state.startTownTooltip = action.payload;
    },
    setEndTown: (state, action: PayloadAction<ITown | null>) => {
      state.endTown = action.payload;
    },
    setEndTownTooltip: (state, action: PayloadAction<string>) => {
      state.endTownTooltip = action.payload;
    },
    setStartDate: (state, action: PayloadAction<Date | null>) => {
      state.startDate = action.payload;
    },
    setStartDateTooltip: (state, action: PayloadAction<string>) => {
      state.startDateTooltip = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date | null>) => {
      state.endDate = action.payload;
    },
    setEndDateTooltip: (state, action: PayloadAction<string>) => {
      state.endDateTooltip = action.payload;
    },
  },
});

export const {
  resetSearchFormSlice,
  setStartTown,
  setStartTownTooltip,
  setEndTown,
  setEndTownTooltip,
  setStartDate,
  setStartDateTooltip,
  setEndDate,
  setEndDateTooltip,
} = searchFormSlice.actions;

export default searchFormSlice.reducer;
