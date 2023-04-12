import { createSlice } from '@reduxjs/toolkit'
import { getSections } from '../../http/index'

export const STATUS = Object.freeze({
    SECCESS: 'success',
    FAILED: 'failed',
    LOADING: 'loading',
    NOT_STARTED: false,
})

const initialState = {
    sectionData: [],
    sectionCache: [],
    status: STATUS.NOT_STARTED,
}

export const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        setSection: (state, actions) => {
            const { data } = actions.payload
            state.sectionData = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setSection,
    setStatus
} = sectionSlice.actions

export default sectionSlice.reducer

// Thunks
export function sliceGetSections(data:any) {
    return async function fetchThunk(dispatch:any) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getSections()
            dispatch(setSection(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
                console.log("🚀 ~ file: sectionSlice.js ~ line 48 ~ fetchThunk ~ error" || error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}
