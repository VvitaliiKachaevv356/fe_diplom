import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

interface IInitialState {
  orderData: { status: boolean };
  orderIsLoading: boolean;
  orderHasError: boolean;
}

const initialState: IInitialState = {
  orderData: { status: false }, // ответ от сервера
  orderIsLoading: false, // процесс загрузки данных
  orderHasError: false, //ошибка при загрузке данных
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const orderSlice = createSliceWithThunk({
  name: 'order',
  initialState,
  reducers: (creators) => ({
    resetOrderSlice: creators.reducer((state) => {
      state.orderData = initialState.orderData;
      state.orderIsLoading = initialState.orderIsLoading;
      state.orderHasError = initialState.orderHasError;
    }),
    // асинхронный экшен на вход принимает stringify от объекта data и возвращает action.payload вида {status: boolean}:
    sendOrder: creators.asyncThunk<{ status: boolean }, string>(
      async (data, { rejectWithValue }) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const route = '/order';
        const request = baseUrl + route;

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        };

        try {
          const response = await fetch(request, options);

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
          state.orderData = { status: false };
          state.orderHasError = false;
          state.orderIsLoading = true;
        },
        fulfilled: (state, { payload }) => {
          state.orderData = payload;
        },
        rejected: (state) => {
          state.orderHasError = true;
        },
        settled: (state) => {
          state.orderIsLoading = false;
        },
      }
    ),
  }),
});

export const { resetOrderSlice, sendOrder } = orderSlice.actions;

export default orderSlice.reducer;
