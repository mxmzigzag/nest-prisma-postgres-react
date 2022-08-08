import { configureStore } from "@reduxjs/toolkit";

import { globalApi } from "./api/global.api";

import userReducer from "./slice/user.slice";
import blogReducer from "./slice/blog.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    [globalApi.reducerPath]: globalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([globalApi.middleware]),
});
