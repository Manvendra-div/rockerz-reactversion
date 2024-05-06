import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const loadingSlice = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.value = false
    },
    startLoading: (state) => {
      state.value = true
    }
  },
})

export const {  startLoading, stopLoading } = loadingSlice.actions

export default loadingSlice.reducer

