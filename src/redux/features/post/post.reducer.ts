import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { StrapiPost } from "../../../types/post.types";

type PostSliceState = {
  loadedPosts: StrapiPost[];
  page: number;
  isLastPage: boolean;
  // currentPost: StrapiPost | null;
  // loading: boolean;
};

const initialState: PostSliceState = {
  // currentPost: null,
  loadedPosts: [],
  page: 0,
  isLastPage: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoadedPosts: (state, action: PayloadAction<StrapiPost[]>) => {
      state.loadedPosts = action.payload;
    },
    appendLoadedPosts: (state, action: PayloadAction<StrapiPost[]>) => {
      state.loadedPosts = [...state.loadedPosts, ...action.payload];
      // state.loadedPosts.push(...action.payload);
    },
    setPostPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incrementPage: (state, action: PayloadAction<number>) => {
      state.page = state.page + action.payload;
    },
    setIsLastPage: (state, action: PayloadAction<boolean>) => {
      state.isLastPage = action.payload;
    },
    // setCurrentPost: (state, action: PayloadAction<StrapiPost>) => {
    //   state.currentPost = action.payload;
    // },
    // clearCurrentPost: (state) => {
    //   state.currentPost = null;
    // }
  }
});

export const {
  setLoadedPosts,
  appendLoadedPosts,
  setPostPage,
  incrementPage,
  setIsLastPage,
  // setCurrentPost,
  // clearCurrentPost,
} = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCurrentPost = (state: RootState) => state.post.currentPost;
export const selectLoadedPosts = (state: RootState) => state.post.loadedPosts;
export const selectPostPage = (state: RootState) => state.post.page;
export const selectIsLastPage = (state: RootState) => state.post.isLastPage;

export const postReducer = postSlice.reducer;
