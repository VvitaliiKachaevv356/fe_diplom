import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  articleForwardCheckboxDetails: boolean;
  articleBackwardCheckboxDetails: boolean;
  articlePassengerCheckboxDetails: boolean;
}

const initialState: IInitialState = {
  articleForwardCheckboxDetails: true,
  articleBackwardCheckboxDetails: true,
  articlePassengerCheckboxDetails: true,
};

const checkboxDetailsSlice = createSlice({
  name: 'checkboxDetails',
  initialState,
  reducers: {
    resetCheckboxDetailsSlice: (state) => {
      state.articleForwardCheckboxDetails =
        initialState.articleForwardCheckboxDetails;
      state.articleBackwardCheckboxDetails =
        initialState.articleBackwardCheckboxDetails;
      state.articlePassengerCheckboxDetails =
        initialState.articlePassengerCheckboxDetails;
    },
    setArticleForwardCheckboxDetails: (state, action) => {
      state.articleForwardCheckboxDetails = action.payload;
    },
    setArticleBackwardCheckboxDetails: (state, action) => {
      state.articleBackwardCheckboxDetails = action.payload;
    },
    setArticlePassengerCheckboxDetails: (state, action) => {
      state.articlePassengerCheckboxDetails = action.payload;
    },
  },
});

export const {
  resetCheckboxDetailsSlice,
  setArticleForwardCheckboxDetails,
  setArticleBackwardCheckboxDetails,
  setArticlePassengerCheckboxDetails,
} = checkboxDetailsSlice.actions;

export default checkboxDetailsSlice.reducer;
