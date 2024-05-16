import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null,
};

export const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userData",JSON.stringify(state.user));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { setUser, clearUser } = LoginSlice.actions;

export default LoginSlice.reducer;
