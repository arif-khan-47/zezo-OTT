import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import sectionSlice from "./Slices/sectionSlice";
import subscriptionSlice from "./Slices/subscriptionSlice";
import playerSlice from "./Slices/playerSlice";
import detailsSlice from "./Slices/detailsSlice";
import seriesSlice from "./Slices/seriesSlice";
import contentSlice from "./Slices/contentSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    section: sectionSlice,
    subscription: subscriptionSlice,
    player: playerSlice,
    details: detailsSlice,
    series: seriesSlice,
    content: contentSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch