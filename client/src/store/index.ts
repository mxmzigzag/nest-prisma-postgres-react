import { configureStore } from "@reduxjs/toolkit";

import { globalApi } from "./api/global.api";

import userReducer from "./slice/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [globalApi.reducerPath]: globalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([globalApi.middleware]),
});
