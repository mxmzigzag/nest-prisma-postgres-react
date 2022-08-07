import React from "react";
import { NavLink } from "react-router-dom";

import { Post } from "../../types/post.types";

import ViewsIcon from "../../assets/svg/views";
import PostTags from "./postTags";

export const PostCard = ({
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
}: Partial<Post>) => {
  return (
    <NavLink to={`/post/${id}`}>
      <div
        className="post"
        style={{
          backgroundImage: `url(http://localhost:5000/${image})`,
        }}
      >
        {tags ? <PostTags tags={tags} /> : null}
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
            </div>
          ) : null}
          <div className="post-views">
            <ViewsIcon className="post-views-icon" />
            {viewsCount}
          </div>
        </div>
      </div>
    </NavLink>
  );
};
