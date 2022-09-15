import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Role } from "../../types/user.types";
import { Post } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";

import PostTags from "./postTags";
import PostForm from "../PostForm/postForm";
import Modal from "../../components/ui/modal";

import ViewsIcon from "../../assets/svg/views";
import PenIcon from "../../assets/svg/pen";

export default function PostCard({
  id,
  title,
  image,
  description,
  authorId,
  author,
  categoryId,
  category,
  viewsCount,
  tags,
}: Partial<Post>) {
  const { user } = useAuth();
  const isAuthor = authorId === user?.id;
  const isAdmin = user?.role === Role.ADMIN;

  const [editIsOpen, setEditIsOpen] = useState(false);

  return (
    <div
      className={`post ${author?.banned ? "banned" : ""}`}
      style={{
        backgroundImage: `url(http://localhost:5000/${image})`,
      }}
    >
      {tags ? <PostTags tags={tags} /> : null}
      {isAuthor || isAdmin ? (
        <>
          <button
            className="post-edit-btn"
            onClick={(e) => {
              e.preventDefault();
              setEditIsOpen(true);
            }}
          >
            <PenIcon color="#fff" width={20} height={20} />
          </button>
          <Modal
            title="Edit Post"
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
          >
            <PostForm
              post={{
                id,
                title,
                image,
                description,
                authorId,
                author,
                categoryId,
                category,
                viewsCount,
                tags,
              }}
              setIsOpen={setEditIsOpen}
            />
          </Modal>
        </>
      ) : null}
      <div className="post-content">
        {category ? (
          <span
            className="post-category"
            style={{ backgroundColor: category.color }}
            onClick={() => console.log(categoryId)}
          >
            {category.title}
          </span>
        ) : null}
        <p className="post-title">{title}</p>
        <p className="post-descr">{description}</p>
      </div>
      <div className="post-bottom">
        {author ? (
          <div className="post-author" onClick={() => console.log(authorId)}>
            {author.username}
            {author.banned ? <div className="banned-badge">Banned</div> : null}
          </div>
        ) : null}
        <div className="post-views">
          <ViewsIcon className="post-views-icon" />
          {viewsCount}
        </div>
      </div>
      <NavLink to={`/post/${id}`} className="post-link" />
    </div>
  );
}
