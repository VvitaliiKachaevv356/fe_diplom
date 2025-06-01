import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPaymentState {
  lastName: { value: string; isValid: boolean; hasError: boolean };
  firstName: { value: string; isValid: boolean; hasError: boolean };
  middleName: { value: string; isValid: boolean; hasError: boolean };
  phoneNumber: { value: string; isValid: boolean; hasError: boolean };
  email: { value: string; isValid: boolean; hasError: boolean };
  cash: boolean;
}

const initialState: IPaymentState = {
  lastName: { value: '', isValid: false, hasError: false }, // фамилия
  firstName: { value: '', isValid: false, hasError: false }, // имя
  middleName: { value: '', isValid: false, hasError: false }, // отчество
  phoneNumber: { value: '', isValid: false, hasError: false }, // контактный телефон
  email: { value: '', isValid: false, hasError: false }, // электронная почта
  cash: false, // false - для оплаты онлайн (по умолчанию), true - для оплаты наличными
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentSlice: (state) => {
      state.lastName = initialState.lastName;
      state.firstName = initialState.firstName;
      state.middleName = initialState.middleName;
      state.phoneNumber = initialState.phoneNumber;
      state.email = initialState.email;
      state.cash = initialState.cash;
    },
    setPaymentLastName: (
      state,
      action: PayloadAction<{
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { value, isValid, hasError } = action.payload;
      state.lastName = {
        value,
        isValid,
        hasError,
      };
    },
    setPaymentFirstName: (
      state,
      action: PayloadAction<{
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { value, isValid, hasError } = action.payload;
      state.firstName = {
        value,
        isValid,
        hasError,
      };
    },
    setPaymentMiddleName: (
      state,
      action: PayloadAction<{
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { value, isValid, hasError } = action.payload;
      state.middleName = {
        value,
        isValid,
        hasError,
      };
    },
    setPaymentPhoneNumber: (
      state,
      action: PayloadAction<{
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { value, isValid, hasError } = action.payload;
      state.phoneNumber = {
        value,
        isValid,
        hasError,
      };
    },
    setPaymentEmail: (
      state,
      action: PayloadAction<{
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { value, isValid, hasError } = action.payload;
      state.email = {
        value,
        isValid,
        hasError,
      };
    },
    setСash: (state, action: PayloadAction<boolean>) => {
      state.cash = action.payload;
    },
  },
});

export const {
  resetPaymentSlice,
  setPaymentLastName,
  setPaymentFirstName,
  setPaymentMiddleName,
  setPaymentPhoneNumber,
  setPaymentEmail,
  setСash,
} = paymentSlice.actions;

export default paymentSlice.reducer;
