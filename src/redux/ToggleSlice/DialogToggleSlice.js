import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: false,
  title: undefined,
  content: undefined,
};

export const DialogToggleSlice = createSlice({
  name: "DialogSlice",
  initialState,
  reducers: {
    showDialog: (state) => {
      state.state = true;
    },
    closeDialog: (state) => {
      state.state = false;
    },
    setDialogData: (state,action) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
  },
});

export const { showDialog, closeDialog, setDialogData } =
  DialogToggleSlice.actions;

export default DialogToggleSlice.reducer;
