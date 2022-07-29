import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: () => ({}),
});
