import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { useAuth } from "../hooks/useAuth";
import {
  useGetOnePostQuery,
  useUpdatePostViewsCountMutation,
} from "../store/api/post.api";
import {
  useCreateCommentMutation,
  useGetCommentsOfPostQuery,
} from "../store/api/comment.api";

import PostTags from "../features/Posts/postTags";
import Loader from "../components/ui/loader";

import { successToast } from "../components/ui/toast";
import Comments from "../features/Comments/comments";
import TextareaInput from "../components/forms/textareaInput";
import Button from "../components/ui/button";

import ViewsIcon from "../assets/svg/views";
import CalendarIcon from "../assets/svg/calendar";

export default function Post() {
  const { postId } = useParams();
  const { user } = useAuth();
  const [comment, setComment] = useState<string>("");

  const { data: post, isLoading } = useGetOnePostQuery(postId || "");
  const [updateViewsCount] = useUpdatePostViewsCountMutation();

  const { data: comments = [], isLoading: isLoadingComments } =
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
          </div>
          <div className="post-page-content">{post.body}</div>
          <div className="post-page-bottom">
            <CalendarIcon />
            <span className="post-page-bottom-date">
              {dayjs(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
          <div className="post-page-comments">
            <h4 className="post-page-comments-title">Comments</h4>
            {isLoadingComments ? (
              <Loader />
            ) : (
              <>
                <Comments comments={comments} />
                <form
                  className="post-page-comments-form"
                  onChange={handleCreateComment}
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
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
