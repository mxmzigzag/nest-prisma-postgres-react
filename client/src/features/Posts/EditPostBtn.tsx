import React, { useState } from "react";

import { Post } from "../../types/post.types";

import Modal from "../../components/ui/modal";
import PostForm from "../PostForm/postForm";

import PenIcon from "../../assets/svg/pen";

type Props = {
  post: Partial<Post>;
  text?: string;
  iconSize?: number;
  className?: string;
};

export default function EditPostBtn({
  post,
  text = "",
  iconSize = 20,
  className = "",
}: Props) {
  const [editIsOpen, setEditIsOpen] = useState(false);
  return (
    <>
      <button
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setEditIsOpen(true);
        }}
      >
        {text ? <span>{text}</span> : null}
        <PenIcon color="#fff" width={iconSize} height={iconSize} />
      </button>
      <Modal title="Edit Post" isOpen={editIsOpen} setIsOpen={setEditIsOpen}>
        <PostForm post={post} setIsOpen={setEditIsOpen} />
      </Modal>
    </>
  );
}
