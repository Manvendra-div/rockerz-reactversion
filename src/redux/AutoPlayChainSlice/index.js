import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const AutoPlayChainSlice = createSlice({
  name: "autoplaylist",
  initialState,
  reducers: {
    updateAutoPlay: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateAutoPlay } =
AutoPlayChainSlice.actions;

export default AutoPlayChainSlice.reducer;
