import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingSlice/loadinSlice";
import SideBarToggleSlice from "./SideBarToggleSlice/SideBarToggleSlice";
export const store = configureStore({
  reducer: { loadingState: loadingReducer,sideBarToggle:SideBarToggleSlice },
});
