import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getAllContentEndpoint, searchContentEndpoint } from '../../http/index'

export const STATUS = Object.freeze({
    SECCESS: 'success',
    FAILED: 'failed',
    LOADING: 'loading',
    NOT_STARTED: false,
})

interface IContentState {
    singleContent: {
        _id: string,
        name: string,
        slug: string,
        u_age: string,
        description: string,
        duration: string,
        rating: number,
        source_link: string | null,
        source_type: 'HLS' | 'MP4' | 'LIVE_STREAM_HLS'
        trailer_source_link: string | null,
        trailer_source_type: 'HLS' | 'MP4',
        language: {
            _id: string,
            name: string,
        }[] | null,
        cast: {
            _id: string,
            name: string,
            avatar: string | null,
            type: string,
        }[] | null,
        poster: string,
        thumbnail: string,
        tags: string[],
        seasons: {
            _id: string,
            name: string,
            content_id: string,
            order: number,
            episodes: {
                _id: string,
                name: string,
                description: string,
                duration: number,
                source_link: string,
                source_type: 'HLS' | 'MP4',
                content_offering_type: 'FREE' | 'PREMIUM',
                thumbnail: string,
                createdAt: string,
                updatedAt: string,
            }[] | null,
            status: boolean,
            created_by: string,
            createdAt: string,
            updatedAt: string,
        }[] | null,
        type: 'series' | 'movie' | 'live_stream',
        content_offering_type: 'FREE' | 'PREMIUM',
        updated_by: string,
        created_by: string,
        createdAt: string,
        updatedAt: string,
        category: {
            _id: string,
            name: string,
        }[] | null,
        genres: {
            _id: string,
            name: string,
        }[] | null,
    } | null,
    status: "idle" | "loading" | "failed" | "success"
    searchResult: {
        _id: string,
        name: string,
        slug: string,
        u_age: string,
        description: string,
        duration: string,
        rating: number,
        source_link: string | null,
        source_type: 'HLS' | 'MP4' | 'LIVE_STREAM_HLS'
        trailer_source_link: string | null,
        trailer_source_type: 'HLS' | 'MP4',
        language: {
            _id: string,
            name: string,
        }[] | null,
        cast: {
            _id: string,
            name: string,
            avatar: string | null,
            type: string,
        }[] | null,
        poster: string,
        thumbnail: string,
        tags: string[],
        seasons: {
            _id: string,
            name: string,
            content_id: string,
            order: number,
            episodes: {
                _id: string,
                name: string,
                description: string,
                duration: number,
                source_link: string,
                source_type: 'HLS' | 'MP4',
                content_offering_type: 'FREE' | 'PREMIUM',
                thumbnail: string,
                createdAt: string,
                updatedAt: string,
            }[] | null,
            status: boolean,
            created_by: string,
            createdAt: string,
            updatedAt: string,
        }[] | null,
        type: 'series' | 'movie' | 'live_stream',
        content_offering_type: 'FREE' | 'PREMIUM',
        updated_by: string,
        created_by: string,
        createdAt: string,
        updatedAt: string,
        category: {
            _id: string,
            name: string,
        }[] | null,
        genres: {
            _id: string,
            name: string,
        }[] | null,
    }[]
}

const initialState: IContentState = {
    singleContent: null as IContentState['singleContent'],
    status: "idle",
    searchResult: [] as IContentState['searchResult']
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setSingleContent: (state, actions) => {
            state.singleContent = actions.payload
        },
        setStatusContent: (state, actions: PayloadAction<IContentState['status']>) => {
            state.status = actions.payload
        },
        setSearchResult: (state, actions: PayloadAction<IContentState['searchResult']>) => {
            state.searchResult = actions.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setSingleContent,
    setStatusContent,
    setSearchResult
} = contentSlice.actions

export default contentSlice.reducer

// get series   
export function getContentFunc(query: string) {
    return async (dispatch: any) => {
        dispatch(setStatusContent('loading'))
        try {
            const { data } = await getAllContentEndpoint(query)
            dispatch(setSingleContent(data.data[0]))
            dispatch(setStatusContent(STATUS.SECCESS))
        } catch (error) {
            dispatch(setStatusContent(STATUS.FAILED))
        }
    }
}

// search content
export function searchContent(query: string) {
    return async (dispatch: any) => {
        dispatch(setStatusContent('loading'))
        try {
            const { data } = await searchContentEndpoint(query)
            dispatch(setSearchResult(data.data))
            dispatch(setStatusContent(STATUS.SECCESS))
        } catch (error) {
            dispatch(setStatusContent(STATUS.FAILED))
        }
    }
}