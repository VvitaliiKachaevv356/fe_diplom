import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../models/models.ts"; // Убедитесь, что путь правильный

interface DepartureState {
  routeDestinationId: number | null;
  adultsCount: number;
  childrenCount: number;
  babyCount: number;
  activePerson: number | null;
  currentCarriageType: string | null;
  typeCarriagesList: string[];
  copyCurrentTypeCarriagesList: string[];
  activeCarriageIndex: number | null;
  wiFiPrice: number;
  linensPrice: number;
  orderList: IOrder[];
}

const initialState: DepartureState = {
  routeDestinationId: null,
  adultsCount: 0,
  childrenCount: 0,
  babyCount: 0,
  activePerson: null,
  currentCarriageType: null,
  typeCarriagesList: [],
  copyCurrentTypeCarriagesList: [],
  activeCarriageIndex: null,
  wiFiPrice: 0,
  linensPrice: 0,
  orderList: [],
};

const departureSlice = createSlice({
  name: "departure",
  initialState,
  reducers: {
    resetDepartureSlice: () => initialState,
    setDepartureRouteDestinationId: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.routeDestinationId = action.payload;
    },
    setDepartureAdultsCount: (state, action: PayloadAction<number>) => {
      state.adultsCount = action.payload;
    },
    setDepartureChildrenCount: (state, action: PayloadAction<number>) => {
      state.childrenCount = action.payload;
    },
    setDepartureBabyCount: (state, action: PayloadAction<number>) => {
      state.babyCount = action.payload;
    },
    setDepartureActivePerson: (state, action: PayloadAction<number | null>) => {
      state.activePerson = action.payload;
    },
    setDepartureCurrentCarriageType: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.currentCarriageType = action.payload;
    },
    setDepartureCurrentTypeCarriagesList: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.typeCarriagesList = action.payload;
    },
    setDepartureCopyCurrentTypeCarriagesList: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.copyCurrentTypeCarriagesList = action.payload;
    },
    setDepartureActiveCarriageIndex: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.activeCarriageIndex = action.payload;
    },
    setDepartureWiFiPrice: (state, action: PayloadAction<number>) => {
      state.wiFiPrice = action.payload;
    },
    setDepartureLinensPrice: (state, action: PayloadAction<number>) => {
      state.linensPrice = action.payload;
    },
    setDepartureOrder: (state, action: PayloadAction<IOrder[]>) => {
      state.orderList = action.payload;
    },
  },
});

export const {
  resetDepartureSlice,
  setDepartureRouteDestinationId,
  setDepartureAdultsCount,
  setDepartureChildrenCount,
  setDepartureBabyCount,
  setDepartureActivePerson,
  setDepartureCurrentCarriageType,
  setDepartureCurrentTypeCarriagesList,
  setDepartureCopyCurrentTypeCarriagesList,
  setDepartureActiveCarriageIndex,
  setDepartureWiFiPrice,
  setDepartureLinensPrice,
  setDepartureOrder,
} = departureSlice.actions;

export default departureSlice.reducer;
