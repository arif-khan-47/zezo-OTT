import { createSlice } from '@reduxjs/toolkit'
import { getSubscriptions } from '../../http'

export const STATUS = Object.freeze({
    SECCESS: 'success',
    FAILED: 'failed',
    LOADING: 'loading',
})

const initialState = {
    data: false,
    status: false,
    isPrimium: false,
}

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        setSubscriptions: (state, actions) => {
            const { data } = actions.payload
            state.data = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        },
        setIsPrimium: (state, actions) => {
            state.isPrimium = actions.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setSubscriptions,
    setStatus,
    setIsPrimium,
} = subscriptionSlice.actions

export default subscriptionSlice.reducer

// Thunks
export function fetchSubscriptions(page = 1, limit = 10, order = 'desc') {
    return async function fetchThunk(dispatch:any) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            // const res = await getSubscriptions(page, limit, order)
            const res = await getSubscriptions()
            dispatch(setSubscriptions(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}