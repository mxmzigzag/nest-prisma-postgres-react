import { globalApi } from "./global.api";

import {
  Comment,
  CreateComment,
  GetAllComments,
} from "../../types/comment.types";

export const commentApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["Comment", "Post"] })
  .injectEndpoints({
    endpoints: (build) => ({
      createComment: build.mutation<Comment, CreateComment>({
        query: (comment) => ({
          url: "comment",
          method: "POST",
          body: comment,
        }),
        invalidatesTags: ["Comment", "Post"],
      }),
      getCommentsOfPost: build.query<GetAllComments, string>({
        query: (postId) => ({
          url: `post/${postId}/comments`,
        }),
        providesTags: ["Comment", "Post"],
      }),
      addReplyToComment: build.mutation<Comment, CreateComment>({
        query: (comment) => ({
          url: "comment/reply",
          method: "POST",
          body: comment,
        }),
        invalidatesTags: ["Comment", "Post"],
      }),
      getCommentReplies: build.query<Comment[], string>({
        query: (commentId) => ({
          url: `comment/${commentId}`,
        }),
        providesTags: ["Comment", "Post"],
      }),
    }),
  });

export const {
  useCreateCommentMutation,
  useGetCommentsOfPostQuery,
  useAddReplyToCommentMutation,
  useGetCommentRepliesQuery,
} = commentApi;
