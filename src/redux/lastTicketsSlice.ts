import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { ITrain } from '../models/models';

// ответ по запросу 'https://students.netoservices.ru/fe-diplom/routes/last':
// [ITrain, ITrain, ITrain, ... ]

interface IInitialState {
  lastTickets: ITrain[];
  lastTicketsLoading: boolean;
}

const initialState: IInitialState = {
  lastTickets: [], // массив последних билетов (3шт)
  lastTicketsLoading: false, // процесс загрузки данных по последним билетам
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const lastTicketsSlice = createSliceWithThunk({
  name: 'lastTickets',
  initialState,
  reducers: (creators) => ({
    resetLastTicketsSlice: creators.reducer((state) => {
      state.lastTickets = initialState.lastTickets;
      state.lastTicketsLoading = initialState.lastTicketsLoading;
    }),
    // asyncThunk<ITrain[]> изначает, что асинхронный экшен не будет ничего принимать и будет возвращать action.payload вида ITrain[]:
    fetchLastTickets: creators.asyncThunk<ITrain[]>(
      async (_, { rejectWithValue }) => {
        try {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const route = '/routes/last';

          const request = baseUrl + route;

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
          state.lastTicketsLoading = true;
        },
        fulfilled: (state, action) => {
          state.lastTickets = JSON.parse(JSON.stringify(action.payload))
            .reverse()
            .slice(0, 3); // последние 3 билета из 5 получаемых с сервера
        },
        rejected: (state) => {
          state.lastTickets = [];
        },
        settled: (state) => {
          state.lastTicketsLoading = false;
        },
      }
    ),
  }),
});

export const { resetLastTicketsSlice, fetchLastTickets } =
  lastTicketsSlice.actions;
export default lastTicketsSlice.reducer;
