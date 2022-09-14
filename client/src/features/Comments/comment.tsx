import React, { useState } from "react";
import dayjs from "dayjs";

import { Role } from "../../types/user.types";
import { Comment as CommentModel } from "../../types/comment.types";

import { useAuth } from "../../hooks/useAuth";
import {
  useDeleteCommentMutation,
  useGetCommentRepliesQuery,
} from "../../store/api/comment.api";

import { errorToast, successToast } from "../../components/ui/toast";
import Reply from "./reply";
import Confirmation from "../../components/ui/confirmation";

import ReplyFilledIcon from "../../assets/svg/replyFilled";
import ReplyOutlinedIcon from "../../assets/svg/replyOutlined";
import DeleteIcon from "../../assets/svg/delete";
import HeartOutlinedIcon from "../../assets/svg/heartOutlined";

type Props = {
  comment: CommentModel;
};

export default function Comment({ comment }: Props) {
  const { user, isAuth } = useAuth();
  const isCommentOwner = user?.id === comment.userId;
  const isAdmin = user?.role === Role.ADMIN;

  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  const [confirmationIsOpen, setConfirmationIsOpen] = useState<boolean>(false);

  const { data: childComments = [], isLoading } = useGetCommentRepliesQuery(
    comment.id
  );

  const [deleteComment, { isLoading: isLoadingDelete }] =
    useDeleteCommentMutation();

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      successToast("Comment removed");
    } catch (error: any) {
      errorToast(error.message);
    }
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
          <button className="comment-btn">
            <HeartOutlinedIcon color="#f64848" />
          </button>
          {isAuth ? (
            <>
              <button
                className="comment-reply-btn"
                onClick={() => setIsReplyOpen(!isReplyOpen)}
              >
                {isReplyOpen ? (
                  <ReplyFilledIcon color="#deb887" />
                ) : (
                  <ReplyOutlinedIcon color="#deb887" />
                )}
              </button>
              {isCommentOwner || isAdmin ? (
                <button
                  className="comment-btn"
                  onClick={() => setConfirmationIsOpen(true)}
                >
                  <DeleteIcon color="#ff0000" />
                  <Confirmation
                    isOpen={confirmationIsOpen}
                    setIsOpen={setConfirmationIsOpen}
                    description={`This will delete your comment`}
                    okCallback={handleDelete}
                    okIsLoading={isLoadingDelete}
                  />
                </button>
              ) : null}
            </>
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
