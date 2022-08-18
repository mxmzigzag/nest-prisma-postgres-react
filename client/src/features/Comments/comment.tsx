import React from "react";
import dayjs from "dayjs";

import { Comment as CommentModel } from "../../types/comment.types";

import { useGetCommentRepliesQuery } from "../../store/api/comment.api";

type Props = {
  comment: CommentModel;
};

export default function Comment({ comment }: Props) {
  const { data: childComments = [], isLoading } = useGetCommentRepliesQuery(
    comment.id
  );

  const handleAddReply = () => {
    console.log("reply");
  };

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
          <button className="comment-reply" onClick={handleAddReply}>
            Reply
          </button>
        </div>
      </div>
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
