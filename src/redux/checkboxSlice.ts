import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  articleForwardCheckbox: boolean;
  articleBackwardCheckbox: boolean;
}

const initialState: IInitialState = {
  articleForwardCheckbox: false,
  articleBackwardCheckbox: false,
};

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState,
  reducers: {
    resetCheckboxSlice: (state) => {
      state.articleForwardCheckbox = initialState.articleForwardCheckbox;
      state.articleBackwardCheckbox = initialState.articleBackwardCheckbox;
    },
    setArticleForwardCheckbox: (state, action) => {
      state.articleForwardCheckbox = action.payload;
    },
    setArticleBackwardCheckbox: (state, action) => {
      state.articleBackwardCheckbox = action.payload;
    },
  },
});

export const {
  resetCheckboxSlice,
  setArticleForwardCheckbox,
  setArticleBackwardCheckbox,
} = checkboxSlice.actions;

export default checkboxSlice.reducer;
