import { createSelector, createSlice } from "@reduxjs/toolkit";

import { Category } from "../../types/category.types";

interface BlogState {
  searchQuery: string;
  popular?: "asc" | "desc";
  date?: "asc" | "desc";
  category?: Category;
  tags: string[];
}

const initialState: BlogState = {
  searchQuery: "",
  popular: undefined,
  date: undefined,
  category: undefined,
  tags: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
    setPopularSort(state, action) {
      state.popular = action.payload;
    },
    setDateSort(state, action) {
      state.date = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setCategory,
  setTags,
  setPopularSort,
  setDateSort,
} = blogSlice.actions;

const selectSelf = (state: { blog: BlogState }) => state.blog;

export const getBlogState = createSelector(selectSelf, (state) => state);
export const getBlogSearchQuery = createSelector(
  selectSelf,
  (state) => state.searchQuery
);
export const getBlogCategory = createSelector(
  selectSelf,
  (state) => state.category
);
export const getBlogTags = createSelector(selectSelf, (state) => state.tags);
export const getPopularSort = createSelector(
  selectSelf,
  (state) => state.popular
);
export const getDateSort = createSelector(selectSelf, (state) => state.date);

export default blogSlice.reducer;
