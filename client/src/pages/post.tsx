import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { Role } from "../types/user.types";

import { useAuth } from "../hooks/useAuth";
import {
  useGetOnePostQuery,
  useUpdatePostViewsCountMutation,
} from "../store/api/post.api";
import {
  useCreateCommentMutation,
  useGetCommentsOfPostQuery,
} from "../store/api/comment.api";

import { pluralize } from "../utils/string";
import { successToast } from "../components/ui/toast";
import PostTags from "../features/Posts/postTags";
import Loader from "../components/ui/loader";
import Comments from "../features/Comments/comments";
import TextareaInput from "../components/forms/textareaInput";
import Button from "../components/ui/button";
import EditPostBtn from "../features/Posts/EditPostBtn";

import ViewsIcon from "../assets/svg/views";
import CalendarIcon from "../assets/svg/calendar";

export default function Post() {
  const { postId } = useParams();
  const { user, isAuth } = useAuth();
  const [comment, setComment] = useState<string>("");

  const { data: post, isLoading } = useGetOnePostQuery(postId || "");

  const isAuthor = post?.authorId === user?.id;
  const isAdmin = user?.role === Role.ADMIN;

  const [updateViewsCount] = useUpdatePostViewsCountMutation();

  const { data: commentsData, isLoading: isLoadingComments } =
    useGetCommentsOfPostQuery(postId || "");
  const [createComment, { isLoading: isSending }] = useCreateCommentMutation();

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCreateComment = async (e: FormEvent) => {
    e.preventDefault();
    if (user?.id && postId) {
      await createComment({ message: comment, userId: user.id, postId });
      setComment("");
      successToast("Your comment is added!");
    }
  };

  const handleUpdateViewCount = async (postId: string) => {
    updateViewsCount(postId);
  };

  useEffect(() => {
    handleUpdateViewCount(postId || "");
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {isLoading || !post ? (
        <Loader />
      ) : (
        <>
          <div
            className="w-full min-h-[40vh] bg-cover flex flex-col items-center justify-between p-5 relative before:absolute before:inset-0 before:bg-black before:opacity-30"
            style={{
              backgroundImage: `url(http://localhost:5000/${post.image})`,
            }}
          >
            <div className="flex items-center justify-between w-full mb-6 z-10">
              <div
                className="inline-block rounded py-0.5 px-1 text-white"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.title}
              </div>
              <PostTags tags={post.tags} limit={post.tags.length} />
            </div>
            <div className="flex flex-col items-center max-w-[400px] text-white z-10">
              <h1 className="text-[42px] text-center mb-4">{post.title}</h1>
              <h3 className="text-xl text-center mb-2.5">{post.description}</h3>
            </div>
            <div className="flex items-center justify-between max-w-[300px] w-full mt-6 text-white z-10">
              <div className="text-white text-lg">{post.author.username}</div>
              <div className="flex items-center">
                <ViewsIcon />
                <span className="ml-1">{post.viewsCount}</span>
              </div>
            </div>
            {isAuthor || isAdmin ? (
              <EditPostBtn
                post={post}
                text="Edit"
                iconSize={18}
                className="absolute bottom-5 right-5 bg-bBrown border-0 cursor-pointer flex items-center py-1 px-2.5 rounded"
              />
            ) : null}
          </div>
          <div className="flex flex-col flex-1 w-full max-w-[830px] mx-auto py-6 px-4">
            {post.body}
          </div>
          <div className="flex items-center justify-end w-full max-w-[830px] mx-auto mb-6 px-4">
            <CalendarIcon />
            <span className="text-base ml-1">
              {dayjs(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
          <div className="flex flex-col w-full max-w-[830px] mx-auto mb-4 px-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl">Comments</h4>
              {!isLoadingComments && commentsData ? (
                <span className="text-lg">
                  {commentsData.totalCount}{" "}
                  {pluralize({
                    text: "comment",
                    count: commentsData.totalCount,
                  })}
                </span>
              ) : null}
            </div>
            {isLoadingComments || !commentsData ? (
              <Loader />
            ) : (
              <>
                <Comments comments={commentsData.comments} />
                {isAuth ? (
                  <form
                    className="flex flex-col"
                    onSubmit={handleCreateComment}
                  >
                    <TextareaInput
                      name="comment"
                      placeholder={"Write a comment"}
                      value={comment}
                      onChange={handleChangeComment}
                      className="w-full"
                    />
                    <Button
                      type="submit"
                      isLoading={isSending}
                      className="max-w-[200px] ml-auto mt-4"
                    >
                      Send
                    </Button>
                  </form>
                ) : null}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
