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
    <div className="post-page-wrapper">
      {isLoading || !post ? (
        <Loader />
      ) : (
        <>
          <div
            className="post-page-top"
            style={{
              backgroundImage: `url(http://localhost:5000/${post.image})`,
            }}
          >
            <div className="post-page-top-pills">
              <div
                className="post-category"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.title}
              </div>
              <PostTags tags={post.tags} limit={post.tags.length} />
            </div>
            <div className="post-page-top-content">
              <h1>{post.title}</h1>
              <h3>{post.description}</h3>
            </div>
            <div className="post-page-top-info">
              <div className="post-page-top-info-user">
                {post.author.username}
              </div>
              <div className="post-page-top-info-views">
                <ViewsIcon />
                <span>{post.viewsCount}</span>
              </div>
            </div>
            {isAuthor || isAdmin ? (
              <EditPostBtn
                post={post}
                text="Edit"
                iconSize={18}
                className="post-page-edit-btn"
              />
            ) : null}
          </div>
          <div className="post-page-content">{post.body}</div>
          <div className="post-page-bottom">
            <CalendarIcon />
            <span className="post-page-bottom-date">
              {dayjs(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
          <div className="post-page-comments">
            <div className="post-page-comments-heading">
              <h4 className="post-page-comments-title">Comments</h4>
              {!isLoadingComments && commentsData ? (
                <span className="post-page-comments-count">
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
                    className="post-page-comments-form"
                    onSubmit={handleCreateComment}
                  >
                    <TextareaInput
                      name="comment"
                      placeholder={"Write a comment"}
                      value={comment}
                      onChange={handleChangeComment}
                    />
                    <Button type="submit" isLoading={isSending}>
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
