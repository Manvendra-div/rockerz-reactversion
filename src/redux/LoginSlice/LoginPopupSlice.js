import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const LoginPopupSlice = createSlice({
  name: 'popupState',
  initialState,
  reducers: {
    showPopup: (state) => {
      state.value = true
    },
    closePopup: (state) => {
      state.value = false
    }
  },
})

export const { showPopup, closePopup } = LoginPopupSlice.actions

export default LoginPopupSlice.reducer

