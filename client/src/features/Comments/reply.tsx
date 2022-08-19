import React, { ChangeEvent, useState } from "react";

import { useAddReplyToCommentMutation } from "../../store/api/comment.api";

import { errorToast, successToast } from "../../components/ui/toast";
import TextareaInput from "../../components/forms/textareaInput";
import Button from "../../components/ui/button";

type Props = {
  userId: string;
  postId: string;
  parentId: string;
  setIsReplyOpen?: (boolean: boolean) => void;
};

export default function Reply({
  userId,
  postId,
  parentId,
  setIsReplyOpen,
}: Props) {
  const [reply, setReply] = useState<string>("");

  const [addReply, { isLoading }] = useAddReplyToCommentMutation();

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const handleAddReply = async () => {
    try {
      await addReply({ message: reply, userId, postId, parentId });
      successToast("Reply is added");
      if (setIsReplyOpen) setIsReplyOpen(false);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <div className="comment-reply">
      <TextareaInput
        name="reply"
        placeholder={"Write a reply"}
        value={reply}
        onChange={handleReplyChange}
      />
      <Button onClick={handleAddReply} isLoading={isLoading}>
        Send
      </Button>
    </div>
  );
}
