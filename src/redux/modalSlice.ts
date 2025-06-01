import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  isOpen: boolean;
  type: string;
  title: string;
  text: string;
}

const initialState: IInitialState = {
  isOpen: false,
  type: '', // 'error' or 'warning'
  title: '',
  text: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.text = action.payload.text;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = '';
      state.title = '';
      state.text = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
