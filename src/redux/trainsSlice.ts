import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { ISearchParams, ITrain } from '../models/models';

// ответ по запросу 'https://students.netoservices.ru/fe-diplom/routes?from_city_id=66ac8b69cb563f0052174f45&to_city_id=66ac8b69cb563f0052174f47&date_start=2025-03-10&date_end=2030-03-13':

// {
//   "total_count": 8, // количество найденных поездов - ??? (не всегда совпадает почему-то...)
//   "items": [ITrain, ITrain, ITrain],
// }

interface IInitialState {
  trains: ITrain[];
  trainsLoading: boolean;
  currentCount: number;
  currentPage: number;
  currentTrainIndex: number;
  currentPotentialPassengersCount: number;
}

const initialState: IInitialState = {
  trains: [], // найденные по запросу поезда
  trainsLoading: false, // процесс загрузки данных по билетам
  currentCount: 5, // количество единовременно отображаемых на странице билетов
  currentPage: 1, // текущая страница
  currentTrainIndex: 0, // индекс выбранного билета
  currentPotentialPassengersCount: 0, // количество человек, выбирающих места в данном вагоне
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const trainsSlice = createSliceWithThunk({
  name: 'trains',
  initialState,
  reducers: (creators) => ({
    resetTrainsSlice: creators.reducer((state) => {
      state.trains = initialState.trains;
      state.trainsLoading = initialState.trainsLoading;
      state.currentCount = initialState.currentCount;
      state.currentPage = initialState.currentPage;
      state.currentTrainIndex = initialState.currentTrainIndex;
      state.currentPotentialPassengersCount =
        initialState.currentPotentialPassengersCount;
    }),
    clearTrains: creators.reducer((state) => {
      state.trains = [];
    }),
    // asyncThunk<{ total_count: number; items: ITrain[] }, ISearchParams> изначает, что асинхронный экшен будет принимать объект data вида ISearchParams и возвращать action.payload вида { total_count: number; items: ITrain[] }:
    fetchTrains: creators.asyncThunk<
      { total_count: number; items: ITrain[] },
      ISearchParams
    >(
      async (data, { rejectWithValue }) => {
        try {
          const fromCity = `from_city_id=${data.from_city_id}`;
          const toCity = `to_city_id=${data.to_city_id}`;

          const startDate = `date_start=${data.date_start}`;
          const endDate = `date_end=${data.date_end}`;

          const minPrice = data.minPrice ? `&price_from=${data.minPrice}` : '';
          const maxPrice =
            data.maxPrice && data.maxPrice !== 7000
              ? `&price_to=${data.maxPrice}`
              : '';

          const price = `${minPrice}${maxPrice}`;

          const startDepartureHourFrom = data.startDepartureHourFrom
            ? `&start_departure_hour_from=${data.startDepartureHourFrom}`
            : '';

          const startDepartureHourTo =
            data.startDepartureHourTo && data.startDepartureHourTo !== 24
              ? `&start_departure_hour_to=${data.startDepartureHourTo}`
              : '';

          const endDepartureHourFrom = data.endDepartureHourFrom
            ? `&end_departure_hour_from=${data.endDepartureHourFrom}`
            : '';

          const endDepartureHourTo =
            data.endDepartureHourTo && data.endDepartureHourTo !== 24
              ? `&end_departure_hour_to=${data.endDepartureHourTo}`
              : '';

          const startDepartureHours = `${startDepartureHourFrom}${startDepartureHourTo}`;
          const endDepartureHours = `${endDepartureHourFrom}${endDepartureHourTo}`;
          const departureHours = `${startDepartureHours}${endDepartureHours}`;

          const startArrivalHourFrom = data.startArrivalHourFrom
            ? `&start_arrival_hour_from=${data.startArrivalHourFrom}`
            : '';

          const startArrivalHourTo =
            data.startArrivalHourTo && data.startArrivalHourTo !== 24
              ? `&start_arrival_hour_to=${data.startArrivalHourTo}`
              : '';

          const endArrivalHourFrom = data.endArrivalHourFrom
            ? `&end_arrival_hour_from=${data.endArrivalHourFrom}`
            : '';

          const endArrivalHourTo =
            data.endArrivalHourTo && data.endArrivalHourTo !== 24
              ? `&end_arrival_hour_to=${data.endArrivalHourTo}`
              : '';

          const startArrivalHours = `${startArrivalHourFrom}${startArrivalHourTo}`;
          const endArrivalHours = `${endArrivalHourFrom}${endArrivalHourTo}`;
          const arrivalHours = `${startArrivalHours}${endArrivalHours}`;

          const hours = `${departureHours}${arrivalHours}`;

          const firstClass = data.firstClass ? '&have_first_class=true' : '';
          const secondClass = data.secondClass ? '&have_second_class=true' : '';
          const thirdClass = data.thirdClass ? '&have_third_class=true' : '';
          const fourthClass = data.fourthClass ? '&have_fourth_class=true' : '';
          const classes = `${firstClass}${secondClass}${thirdClass}${fourthClass}`;

          const wifi = data.wifi ? '&have_wifi=true' : '';
          const express = data.express ? '&have_express=true' : '';

          const baseUrl = import.meta.env.VITE_BASE_URL;
          const route = '/routes';
          const reqQueryParams = `?${fromCity}&${toCity}&${startDate}&${endDate}`;
          const optQueryParams = `${classes}${price}${hours}${wifi}${express}`;

          const request = baseUrl + route + reqQueryParams + optQueryParams;

          // NOTE: Данные, получаемые с бэка, не всегда верные! Проблема, по-видимому, на сервере...
          // не срабатывают, в частности: 'startArrivalHourFrom', 'startArrivalHourTo', 'endArrivalHourFrom' и 'endArrivalHourTo', хотя запрос формируется верно..
          // а подбор билетов по классам вагонов, вай-фай и минимальной цене не всегда соответствует внутреннему содержимому билета в полях 'arrival' и 'departure'

          const response = await fetch(request);

          if (!response.ok) {
            return rejectWithValue('Ошибка при получении данных от сервера...');
          }

          return await response.json();
        } catch (err) {
          return rejectWithValue(err);
        }
      },
      {
        pending: (state) => {
          state.trainsLoading = true;
        },
        fulfilled: (state, action) => {
          // сразу выполняем сортировку по времени:
          state.trains = JSON.parse(JSON.stringify(action.payload.items)).sort(
            (a: ITrain, b: ITrain) =>
              a.departure.from.datetime - b.departure.from.datetime
          );
        },
        rejected: (state) => {
          state.trains = [];
        },
        settled: (state) => {
          state.trainsLoading = false;
        },
      }
    ),
    setTrains: creators.reducer((state, action: { payload: ITrain[] }) => {
      state.trains = action.payload;
    }),
    setCurrentCount: creators.reducer((state, action: { payload: number }) => {
      state.currentCount = action.payload;
    }),
    setCurrentPage: creators.reducer((state, action: { payload: number }) => {
      state.currentPage = action.payload;
    }),
    setCurrentTrainIndex: creators.reducer(
      (state, action: { payload: number }) => {
        state.currentTrainIndex = action.payload;
      }
    ),
    setCurrentPotentialPassengersCount: creators.reducer(
      (state, action: { payload: number }) => {
        state.currentPotentialPassengersCount = action.payload;
      }
    ),
  }),
});

export const {
  clearTrains,
  fetchTrains,
  resetTrainsSlice,
  setTrains,
  setCurrentCount,
  setCurrentPage,
  setCurrentTrainIndex,
  setCurrentPotentialPassengersCount,
} = trainsSlice.actions;

export default trainsSlice.reducer;
