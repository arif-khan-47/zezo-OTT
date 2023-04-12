import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentTrackTime: false,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentTrackTime: (state, action) => {
            state.currentTrackTime = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentTrackTime } = playerSlice.actions

export default playerSlice.reducer