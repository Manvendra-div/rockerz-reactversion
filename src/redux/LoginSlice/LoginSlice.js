import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: "" },
};

export const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = LoginSlice.actions;

export default LoginSlice.reducer;
