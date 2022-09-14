import { globalApi } from "./global.api";

import {
  Comment,
  CreateComment,
  GetAllComments,
  Like,
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
      likeComment: build.mutation<Like, Like>({
        query: ({ userId, commentId }) => ({
          url: `comment/${commentId}/like`,
          method: "POST",
          body: { userId },
        }),
        invalidatesTags: ["Comment", "Post"],
      }),
      unlikeComment: build.mutation<Like, Like>({
        query: ({ userId, commentId }) => ({
          url: `comment/${commentId}/unlike`,
          method: "POST",
          body: { userId },
        }),
        invalidatesTags: ["Comment", "Post"],
      }),
      deleteComment: build.mutation<Comment, string>({
        query: (commentId) => ({
          url: `comment/${commentId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Comment", "Post"],
      }),
    }),
  });

export const {
  useCreateCommentMutation,
  useGetCommentsOfPostQuery,
  useAddReplyToCommentMutation,
  useGetCommentRepliesQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
