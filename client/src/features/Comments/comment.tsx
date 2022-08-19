import React, { useState } from "react";
import dayjs from "dayjs";

import { Comment as CommentModel } from "../../types/comment.types";

import { useAuth } from "../../hooks/useAuth";
import { useGetCommentRepliesQuery } from "../../store/api/comment.api";

import Reply from "./reply";

type Props = {
  comment: CommentModel;
};

export default function Comment({ comment }: Props) {
  const { user, isAuth } = useAuth();
  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);

  const { data: childComments = [], isLoading } = useGetCommentRepliesQuery(
    comment.id
  );

  return (
    <div className="comment-wrapper">
      <div className="comment-content">
        <div className="comment-top">
          <span className="comment-author">{comment.user.username}</span>
          <span className="comment-date">
            {dayjs(comment.createdAt).format("MMMM DD, YYYY, h:m A")}
          </span>
        </div>
        <div className="comment-message">{comment.message}</div>
        <div className="comment-bottom">
          {isAuth ? (
            <button
              className="comment-reply-btn"
              onClick={() => setIsReplyOpen(!isReplyOpen)}
            >
              {isReplyOpen ? "Close Reply" : "Reply"}
            </button>
          ) : null}
        </div>
      </div>
      {isReplyOpen && user ? (
        <Reply
          userId={user.id}
          parentId={comment.id}
          postId={comment.postId}
          setIsReplyOpen={setIsReplyOpen}
        />
      ) : null}
      {childComments.length && !isLoading ? (
        <div className="comment-child">
          {childComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
