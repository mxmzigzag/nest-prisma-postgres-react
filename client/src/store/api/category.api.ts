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
        query: (category) => {
          const token = localStorage.getItem("token");
          return {
            url: "category",
            method: "POST",
            body: category,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["Category"],
      }),
      updateCategory: build.mutation<Category, Category>({
        query: (category) => {
          const token = localStorage.getItem("token");
          return {
            url: `category/${category.id}`,
            method: "PUT",
            body: category,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["Category"],
      }),
      deleteCategory: build.mutation<Category, string>({
        query: (catId) => {
          const token = localStorage.getItem("token");
          return {
            url: `category/${catId}`,
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
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
