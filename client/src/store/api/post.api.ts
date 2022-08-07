import { globalApi } from "./global.api";

import { Post } from "../../types/post.types";

export const postApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["Post"] })
  .injectEndpoints({
    endpoints: (build) => ({
      createPost: build.mutation<Post, FormData>({
        query: (post) => {
          const token = localStorage.getItem("token");
          return {
            url: "post",
            method: "POST",
            body: post,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["Post"],
      }),
      getAllPosts: build.query<Post[], void>({
        query: () => ({
          url: `posts`,
          method: "GET",
        }),
        providesTags: ["Post"],
      }),
      getTopViewedPosts: build.query<Post[], void>({
        query: () => ({
          url: `topViewedPosts`,
          method: "GET",
        }),
        providesTags: ["Post"],
      }),
      getPostsByAuthorId: build.query<Post[], string>({
        query: (userId) => {
          const token = localStorage.getItem("token");
          return {
            url: `posts/author/${userId}`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        providesTags: ["Post"],
      }),
    }),
  });

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetTopViewedPostsQuery,
  useGetPostsByAuthorIdQuery,
} = postApi;
