import { globalApi } from "./global.api";

import { Post } from "../../types/post.types";

export const postApi = globalApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPosts: build.query<Post[], void>({
      query: () => ({
        url: `posts`,
        method: "GET",
      }),
    }),
    getTopViewedPosts: build.query<Post[], void>({
      query: () => ({
        url: `topViewedPosts`,
        method: "GET",
      }),
    }),
    getPostsByAuthorId: build.query<Post[], number>({
      query: (userId) => ({
        url: `posts/author/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetTopViewedPostsQuery,
  useGetPostsByAuthorIdQuery,
} = postApi;
