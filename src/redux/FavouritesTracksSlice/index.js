import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const FavouriteTrackSlice = createSlice({
  name: "Favourites",
  initialState,
  reducers: {
    addIDtoFavourites: (state, action) => {
      state.value.push(action.payload);
    },
    removeIDfromFavourites: (state, action) => {
      const index = state.value.indexOf(action.payload);
      state.value.splice(index, 1);
    },
  },
});

export const { addIDtoFavourites,removeIDfromFavourites } = FavouriteTrackSlice.actions;

export default FavouriteTrackSlice.reducer;
