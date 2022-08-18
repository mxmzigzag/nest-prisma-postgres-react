import React from "react";

import { Comment as CommentModel } from "../../types/comment.types";

import Comment from "./comment";

type Props = {
  comments: CommentModel[];
};

export default function Comments({ comments }: Props) {
  return (
    <div className="comments-wrapper">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
