import React from "react";
import { NavLink } from "react-router-dom";

import { Role } from "../../types/user.types";
import { Post } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";

import PostTags from "./postTags";
import EditPostBtn from "./EditPostBtn";

import ViewsIcon from "../../assets/svg/views";

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

  return (
    <div
      className={`post ${author?.banned ? "banned" : ""}`}
      style={{
        backgroundImage: `url(http://localhost:5000/${image})`,
      }}
    >
      {tags ? <PostTags tags={tags} /> : null}
      {isAuthor || isAdmin ? (
        <EditPostBtn
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
          className="post-edit-btn"
        />
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
