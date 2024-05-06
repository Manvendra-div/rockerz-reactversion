import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingSlice/loadinSlice";
export const store = configureStore({
  reducer: { loadingState: loadingReducer },
});
