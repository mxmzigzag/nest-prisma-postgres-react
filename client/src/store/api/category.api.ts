import { globalApi } from "./global.api";

import { Category, CreateCategory } from "../../types/category.types";

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
      createCategory: build.mutation<Category, CreateCategory>({
        query: (category) => ({
          url: "category",
          method: "POST",
          body: category,
        }),
        invalidatesTags: ["Category"],
      }),
    }),
  });

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } =
  categoryApi;
