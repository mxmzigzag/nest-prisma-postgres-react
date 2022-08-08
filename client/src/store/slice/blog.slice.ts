import { createSelector, createSlice } from "@reduxjs/toolkit";

import { Category } from "../../types/category.types";

interface BlogState {
  category: Category | null;
}

const initialState: BlogState = {
  category: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = blogSlice.actions;

const selectSelf = (state: { blog: BlogState }) => state.blog;
export const getBlogCategory = createSelector(
  selectSelf,
  (state) => state.category
);

export default blogSlice.reducer;
