import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPassenger } from '../models/models';

interface IPassengersState {
  passengersList: {
    isOpen: boolean; // раскрыта ли вкладка с данными конкретнного пассажира
    isDataValid: boolean; // все ли данные конкретнного пассажира заполнены и валидны
    data: IPassenger; // данные конкретного пассажира
  }[]; // список с данными пассажиров
  passenger: IPassenger;
}

const initialState: IPassengersState = {
  passengersList: [],
  passenger: {
    type: 'Взрослый', // 'Взрослый', 'Детский' или 'Без места'
    lastName: { value: '', isValid: false, hasError: false }, // фамилия
    firstName: { value: '', isValid: false, hasError: false }, // имя
    middleName: { value: '', isValid: false, hasError: false }, // отчество
    gender: true, // true - для 'male', false - для 'female'
    birthdate: { value: '', isValid: false, hasError: false }, // дата рождения
    limitedMobility: false, // наличие инвалидности
    document: 'Паспорт РФ', // 'Паспорт РФ' или 'Свидетельство о рождении'
    passportSeries: { value: '', isValid: false, hasError: false }, // серия паспорта
    passportNumber: { value: '', isValid: false, hasError: false }, // номер паспорта
    certificateNumber: { value: '', isValid: false, hasError: false }, // номер свидетельства
  },
};

const passengersSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    resetPassengersSlice: (state) => {
      state.passengersList = initialState.passengersList;
      state.passenger = initialState.passenger;
    },
    addPassengerToList: (state) => {
      state.passengersList.push({
        isOpen: true,
        isDataValid: false,
        data: initialState.passenger,
      });
    },
    removePassengerFromList: (state, action: PayloadAction<number>) => {
      state.passengersList.splice(action.payload, 1);
    },
    setPassengersList: (state, action: PayloadAction<number>) => {
      state.passengersList = Array.from(
        { length: action.payload },
        (_, index) => ({
          isOpen: index === 0, // первый пассажир всегда открытый
          isDataValid: false,
          data: initialState.passenger,
        })
      );
    },
    setIsOpen: (
      state,
      action: PayloadAction<{ index: number; isOpen: boolean }>
    ) => {
      const { index, isOpen } = action.payload;
      state.passengersList[index].isOpen = isOpen;
    },
    setIsDataValid: (
      state,
      action: PayloadAction<{ index: number; isDataValid: boolean }>
    ) => {
      const { index, isDataValid } = action.payload;
      state.passengersList[index].isDataValid = isDataValid;
    },
    setType: (
      state,
      action: PayloadAction<{ index: number; type: string }>
    ) => {
      const { index, type } = action.payload;
      state.passengersList[index].data.type = type;
    },
    setLastName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.lastName = {
        value,
        isValid,
        hasError,
      };
    },
    setFirstName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.firstName = {
        value,
        isValid,
        hasError,
      };
    },
    setMiddleName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.middleName = {
        value,
        isValid,
        hasError,
      };
    },
    setGender: (
      state,
      action: PayloadAction<{ index: number; gender: boolean }>
    ) => {
      const { index, gender } = action.payload;
      state.passengersList[index].data.gender = gender;
    },
    setBirthdate: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.birthdate = {
        value,
        isValid,
        hasError,
      };
    },
    setLimitedMobility: (
      state,
      action: PayloadAction<{ index: number; mobility: boolean }>
    ) => {
      const { index, mobility } = action.payload;
      state.passengersList[index].data.limitedMobility = mobility;
    },
    setDocument: (
      state,
      action: PayloadAction<{ index: number; document: string }>
    ) => {
      const { index, document } = action.payload;
      state.passengersList[index].data.document = document;
    },
    setPassportSeries: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.passportSeries = {
        value,
        isValid,
        hasError,
      };
    },
    setPassportNumber: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.passportNumber = {
        value,
        isValid,
        hasError,
      };
    },
    setCertificateNumber: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.certificateNumber = {
        value,
        isValid,
        hasError,
      };
    },
  },
});

export const {
  addPassengerToList,
  removePassengerFromList,
  resetPassengersSlice,
  setPassengersList,
  setIsOpen,
  setIsDataValid,
  setType,
  setLastName,
  setFirstName,
  setMiddleName,
  setGender,
  setBirthdate,
  setLimitedMobility,
  setDocument,
  setPassportSeries,
  setPassportNumber,
  setCertificateNumber,
} = passengersSlice.actions;

export default passengersSlice.reducer;
