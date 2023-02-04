import React, { useState } from "react";
import dayjs from "dayjs";

import { Role } from "../../types/user.types";
import { Comment as CommentModel } from "../../types/comment.types";

import { useAuth } from "../../hooks/useAuth";
import {
  useDeleteCommentMutation,
  useGetCommentRepliesQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from "../../store/api/comment.api";

import { errorToast, successToast } from "../../components/ui/toast";
import Reply from "./reply";
import Confirmation from "../../components/ui/confirmation";

import ReplyFilledIcon from "../../assets/svg/replyFilled";
import ReplyOutlinedIcon from "../../assets/svg/replyOutlined";
import DeleteIcon from "../../assets/svg/delete";
import HeartOutlinedIcon from "../../assets/svg/heartOutlined";
import HeartFilledIcon from "../../assets/svg/heartFilled";

type Props = {
  comment: CommentModel;
};

export default function Comment({ comment }: Props) {
  const { user, isAuth } = useAuth();
  const isCommentOwner = user?.id === comment.userId;
  const isAdmin = user?.role === Role.ADMIN;
  const isLikedByMe = !!comment.like.find((like) => like.userId === user?.id);

  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  const [confirmationIsOpen, setConfirmationIsOpen] = useState<boolean>(false);

  const { data: childComments = [], isLoading } = useGetCommentRepliesQuery(
    comment.id
  );

  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();
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

  const handleLike = async () => {
    if (user && isAuth) {
      if (isLikedByMe) {
        await unlikeComment({ userId: user.id, commentId: comment.id });
      } else {
        await likeComment({ userId: user.id, commentId: comment.id });
      }
    }
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-col py-2.5 px-4 mb-4 border-[1px]  border-black rounded-lg w-full bg-white">
        <div className="flex items-center justify-between">
          <span className="text-lg text-bBrown">{comment.user.username}</span>
          <span className="text-base text-bGrayLight">
            {dayjs(comment.createdAt).format("MMMM DD, YYYY, h:m A")}
          </span>
        </div>
        <div className="text-lg my-2.5">{comment.message}</div>
        <div className="flex items-center justify-end">
          <button
            className="flex flex-col items-center cursor-pointer bg-transparent border-0 ml-1"
            onClick={handleLike}
          >
            {isLikedByMe ? (
              <HeartFilledIcon color="#f64848" />
            ) : (
              <HeartOutlinedIcon color="#f64848" />
            )}
            {comment.like.length ? (
              <span className="text-xxs">{comment.like.length}</span>
            ) : null}
          </button>
          {isAuth ? (
            <>
              <button
                className="text-base text-bBrown ml-1 bg-transparent border-0 cursor-pointer hover:text-bBrownHover"
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
                  className="bg-transparent border-0 ml-1 cursor-pointer"
                  onClick={() => setConfirmationIsOpen(true)}
                >
                  <DeleteIcon color="#ff0000" />
                  <Confirmation
                    isOpen={confirmationIsOpen}
                    setIsOpen={setConfirmationIsOpen}
                    description={`This will delete your comment`}
                    okText="Remove"
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
        <div className="flex flex-col w-full max-w-[90%]">
          {childComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
