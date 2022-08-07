import React, { useState } from "react";

import Modal from "./modal";
import PostForm from "../../features/PostForm/postForm";

import PlusIcon from "../../assets/svg/plus";

export default function AddPostBtn() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button className="add-post-btn" onClick={() => setIsOpen(true)}>
        <PlusIcon width={50} height={50} color="#fff" />
      </button>
      <Modal title="Create Post" isOpen={isOpen} setIsOpen={setIsOpen}>
        <PostForm setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}
