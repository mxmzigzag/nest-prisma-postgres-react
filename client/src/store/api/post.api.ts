import { globalApi } from "./global.api";

import {
  GetPostsByAuthorIdArg,
  Post,
  PostPagination,
  TopViewedPost,
} from "../../types/post.types";
import { Limit } from "../../types/common.types";

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
      getAllPosts: build.query<PostPagination, Limit>({
        query: ({ limit }) => ({
          url: `posts?limit=${limit}`,
          method: "GET",
        }),
        providesTags: ["Post"],
      }),
      getTopViewedPosts: build.query<TopViewedPost[], void>({
        query: () => ({
          url: `topViewedPosts`,
          method: "GET",
        }),
        providesTags: ["Post"],
      }),
      getPostsByAuthorId: build.query<PostPagination, GetPostsByAuthorIdArg>({
        query: ({ userId, limit }) => {
          const token = localStorage.getItem("token");
          return {
            url: `posts/author/${userId}?limit=${limit}`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        providesTags: ["Post"],
      }),
      getOnePost: build.query<Post, string>({
        query: (postId) => {
          return {
            url: `post/${postId}`,
            method: "GET",
          };
        },
        providesTags: ["Post"],
      }),
      updatePostViewsCount: build.mutation<Post, string>({
        query: (postId) => {
          return {
            url: `post/${postId}/views`,
            method: "PUT",
          };
        },
        invalidatesTags: ["Post"],
      }),
    }),
  });

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetTopViewedPostsQuery,
  useGetPostsByAuthorIdQuery,
  useGetOnePostQuery,
  useUpdatePostViewsCountMutation,
} = postApi;
