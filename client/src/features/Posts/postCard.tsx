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
      className={`${postCardStyles} ${
        author?.banned
          ? "grayscale transition-all hover:grayscale-0 hover:transition-all"
          : ""
      }`}
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
          className="invisible absolute top-2.5 right-2.5 z-10 bg-none border-0 cursor-pointer group-hover:visible"
        />
      ) : null}
      <div className="flex flex-col items-baseline mt-auto w-full z-10">
        {category ? (
          <span
            className="inline-block rounded px-1 text-white"
            style={{ backgroundColor: category.color }}
            onClick={() => console.log(categoryId)}
          >
            {category.title}
          </span>
        ) : null}
        <p className="text-lg mt-2.5 mb-2 text-white">{title}</p>
        <p className="text-sm text-white mb-1">{description}</p>
      </div>
      <div className="flex items-center justify-between text-white w-full z-10">
        {author ? (
          <div
            className="flex items-center"
            onClick={() => console.log(authorId)}
          >
            {author.username}
            {author.banned ? <div className="ml-1 bg-bGray">Banned</div> : null}
          </div>
        ) : null}
        <div className="flex items-center text-white">
          <ViewsIcon className="mr-1 text-white" />
          {viewsCount}
        </div>
      </div>
      <NavLink to={`/post/${id}`} className="absolute inset-0 z-10" />
    </div>
  );
}

const postCardStyles = `
  group
  flex 
  flex-col 
  items-start 
  rounded 
  p-2.5 
  min-h-[225px] 
  bg-[length:150%] 
  bg-center 
  relative 
  shadow-bShadow 
  transition-all 
  before:absolute 
  before:top-0 
  before:left-0 
  before:h-full 
  before:w-full 
  before:pointer-events-none 
  before:bg-bBgGradient 
  before:transition-all 
  hover:shadow-bShadowHover 
  hover:bg-[length:160%] 
  hover:transition-all
`;
