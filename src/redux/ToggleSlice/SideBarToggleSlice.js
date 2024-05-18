import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const SideBarToggleSlice = createSlice({
  name: 'SideBarSlice',
  initialState,
  reducers: {
    doExpand: (state) => {
      state.value = true
    },
    doContract: (state) => {
      state.value = false
    }
  },
})

export const { doExpand, doContract } = SideBarToggleSlice.actions

export default SideBarToggleSlice.reducer

