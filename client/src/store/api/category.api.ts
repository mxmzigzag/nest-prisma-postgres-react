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
      createCategory: build.mutation<Category, Category>({
        query: (category) => ({
          url: "category",
          method: "POST",
          body: category,
        }),
        invalidatesTags: ["Category"],
      }),
      updateCategory: build.mutation<Category, Category>({
        query: (category) => ({
          url: `category/${category.id}`,
          method: "PUT",
          body: category,
        }),
        invalidatesTags: ["Category"],
      }),
      deleteCategory: build.mutation<Category, string>({
        query: (catId) => ({
          url: `category/${catId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Category"],
      }),
    }),
  });

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
