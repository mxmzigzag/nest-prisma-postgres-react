import { Comment, CreateComment } from "../../types/comment.types";
import { globalApi } from "./global.api";

export const commentApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["Comment"] })
  .injectEndpoints({
    endpoints: (build) => ({
      createComment: build.mutation<Comment, CreateComment>({
        query: (comment) => ({
          url: "comment",
          method: "POST",
          body: comment,
        }),
        invalidatesTags: ["Comment"],
      }),
      getCommentsOfPost: build.query<Comment[], string>({
        query: (postId) => ({
          url: `post/${postId}/comments`,
        }),
        providesTags: ["Comment"],
      }),
      getCommentReplies: build.query<Comment[], string>({
        query: (commentId) => ({
          url: `comment/${commentId}`,
        }),
        providesTags: ["Comment"],
      }),
    }),
  });

export const {
  useCreateCommentMutation,
  useGetCommentsOfPostQuery,
  useGetCommentRepliesQuery,
} = commentApi;
