import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './slices/videosSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;