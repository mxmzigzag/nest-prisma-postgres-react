import { globalApi } from "./global.api";

import { Category } from "../../types/category.types";

export const categoryApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["Category"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllCategories: build.query<Category[], void>({
        query: () => ({
          url: "categories",
          method: "GET",
        }),
        providesTags: ["Category"],
      }),
    }),
  });

export const { useGetAllCategoriesQuery } = categoryApi;
