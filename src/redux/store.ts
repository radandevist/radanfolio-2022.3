import { configureStore } from "@reduxjs/toolkit";

import { postReducer } from "./features/post/post.reducer";
import { mainApi } from "./services/mainApi";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    // auth for later
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(mainApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
