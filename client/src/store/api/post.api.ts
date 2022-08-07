import { globalApi } from "./global.api";

import {
  GetPostsByAuthorIdArg,
  Post,
  PostPagination,
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
      getAllPosts: build.query<Post[], Limit>({
        query: ({ limit }: { limit: number }) => ({
          url: `posts?limit=${limit}`,
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
    }),
  });

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetTopViewedPostsQuery,
  useGetPostsByAuthorIdQuery,
} = postApi;
