import { createSelector, createSlice } from "@reduxjs/toolkit";

import { Category } from "../../types/category.types";
import { Tag } from "../../types/tag.types";

interface BlogState {
  category: Category | null;
  tags: Tag[];
}

const initialState: BlogState = {
  category: null,
  tags: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
  },
});

export const { setCategory, setTags } = blogSlice.actions;

const selectSelf = (state: { blog: BlogState }) => state.blog;

export const getBlogCategory = createSelector(
  selectSelf,
  (state) => state.category
);
export const getBlogTags = createSelector(selectSelf, (state) => state.tags);

export default blogSlice.reducer;
