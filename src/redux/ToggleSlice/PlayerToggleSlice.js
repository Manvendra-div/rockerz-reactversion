import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

export const playerToggleSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    launchPlayer: (state) => {
      state.value = true
    },
    killPlayer: (state) => {
      state.value = false
    },
  },
})

export const { launchPlayer, killPlayer } = playerToggleSlice.actions

export default playerToggleSlice.reducer

