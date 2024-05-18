import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const LastSessionSlice = createSlice({
  name: "LastSession",
  initialState,
  reducers: {
    updateLastSessionRedux: (state, action) => {
      state.value = action.payload;
    },
    addIDtoLastSession: (state, action) => {
      if (state.value.includes(action.payload)) {
        const index = state.value.indexOf(action.payload);
        state.value.splice(index, 1);
        state.value.push(action.payload);
      } else {
        state.value.push(action.payload);
      }
    },
  },
});

export const { addIDtoLastSession,updateLastSessionRedux } = LastSessionSlice.actions;

export default LastSessionSlice.reducer;
