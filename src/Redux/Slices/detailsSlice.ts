import { createSlice } from '@reduxjs/toolkit'
import { getContect } from '../../http'

export const STATUS = Object.freeze({
    SECCESS: 'success',
    FAILED: 'failed',
    LOADING: 'loading',
    NOT_STARTED: false,
})

const initialState = {
    detailsData: false,
    detailsCache: false,
    status: STATUS.LOADING,
}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setDetails: (state, actions) => {
            const { data } = actions.payload
            state.detailsData = data[0] || false
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setDetails,
    setStatus
} = detailsSlice.actions

export default detailsSlice.reducer

// get content details
export function callgetDetails(query:any) {
    return async function fetchThunk(dispatch:any) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getContect(query)
            dispatch(setDetails(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}