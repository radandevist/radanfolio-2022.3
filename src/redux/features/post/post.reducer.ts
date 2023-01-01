import rtk, { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { IPost } from "../../../types/res/post.types";

type IPostSliceState = {
  loading: boolean;
  currentPost: IPost | null;
  loadedPosts: IPost[];
  selectedIds: string[];
};

const initialState: IPostSliceState = {
  loading: false,
  currentPost: null,
  loadedPosts: [],
  selectedIds: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPost: (state, action: rtk.PayloadAction<IPost>) => {
      state.currentPost = action.payload;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
});

export const {
  setCurrentPost,
  clearCurrentPost,
} = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPostCurrentPost = (state: RootState) => state.post.currentPost;

// Export the reducer
export const postReducer = postSlice.reducer;
