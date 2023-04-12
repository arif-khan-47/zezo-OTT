import { createSlice } from '@reduxjs/toolkit'
import { getContect } from '../../http'

export const STATUS = Object.freeze({
    SECCESS: 'success',
    FAILED: 'failed',
    LOADING: 'loading',
    NOT_STARTED: false,
})

const initialState = {
    seriesData: false,
    seriesCache: false,
    status: STATUS.LOADING,
}

export const seriesSlice = createSlice({
    name: 'series',
    initialState,
    reducers: {
        setSeries: (state, actions) => {
            const { data } = actions.payload
            state.seriesData = data || false
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setSeries,
    setStatus
} = seriesSlice.actions

export default seriesSlice.reducer

// get series   
export function callgetSeries(query:any) {
    return async function fetchThunk(dispatch:any) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getContect(query)
            dispatch(setSeries(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}