import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const FavouriteTrackSlice = createSlice({
  name: "Favourites",
  initialState,
  reducers: {
    updateFavouritesRedux: (state, action) => {
      state.value = action.payload;
    },
    addIDtoFavourites: (state, action) => {
      state.value.push(action.payload);
      console.log(state.value);
    },
    removeIDfromFavourites: (state, action) => {
      const index = state.value.indexOf(action.payload);
      state.value.splice(index, 1);
      console.log("removed ", action.payload, " from favorites");
      console.log(state.value);
    },
  },
});

export const { addIDtoFavourites,removeIDfromFavourites,updateFavouritesRedux } = FavouriteTrackSlice.actions;

export default FavouriteTrackSlice.reducer;
