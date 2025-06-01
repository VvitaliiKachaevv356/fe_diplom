import { configureStore } from '@reduxjs/toolkit';
import arrivalReducer from './arrivalSlice';
import carriagesReducer from './carriagesSlice';
import checkboxReducer from './checkboxSlice';
import checkboxDetailsReducer from './checkboxDetailsSlice';
import departureReducer from './departureSlice';
import lastTicketsReducer from './lastTicketsSlice';
import modalReducer from './modalSlice';
import orderReducer from './orderSlice';
import paramsReducer from './paramsSlice';
import passengersReducer from './passengersSlice';
import paymentReducer from './paymentSlice';
import searchFormReducer from './searchFormSlice';
import townsReducer from './townsSlice';
import trainsReducer from './trainsSlice';

const store = configureStore({
  reducer: {
    arrival: arrivalReducer,
    carriages: carriagesReducer,
    checkbox: checkboxReducer,
    checkboxDetails: checkboxDetailsReducer,
    departure: departureReducer,
    lastTickets: lastTicketsReducer,
    modal: modalReducer,
    order: orderReducer,
    params: paramsReducer,
    passengers: passengersReducer,
    payment: paymentReducer,
    searchForm: searchFormReducer,
    towns: townsReducer,
    trains: trainsReducer,
  },
  // настройка проверки сериализуемости - исключаем объект Date:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'searchForm/setStartDate',
          'searchForm/setEndDate',
          'params/setParamStartDate',
          'params/setParamEndDate',
        ],
        ignoredPaths: [
          'searchForm.startDate',
          'searchForm.endDate',
          'params.paramStartDate',
          'params.paramEndDate',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
