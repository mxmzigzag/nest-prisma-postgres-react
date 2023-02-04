import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: () => ({}),
});
