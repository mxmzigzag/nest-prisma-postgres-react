import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Post } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";

import Modal from "../../components/ui/modal";
import PostForm from "../PostForm/postForm";

import ViewsIcon from "../../assets/svg/views";

type Props = {
  posts: Partial<Post>[];
  gridColNum?: number;
};

export default function Posts({ posts, gridColNum = 4 }: Props) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAddPost = () => {
    console.log("add post");
    setIsOpen(true);
  };

  const handleMore = () => {
    console.log("load more");
  };

  return (
    <div className="posts-container">
      {posts.length ? (
        <>
          <div
            className="posts-wrapper"
            style={{ gridTemplateColumns: `repeat(${gridColNum}, 1fr)` }}
          >
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.image}
                description={post.description}
                authorId={post.authorId}
                author={post.author}
                categoryId={post.categoryId}
                category={post.category}
                viewsCount={post.viewsCount}
                tags={post.tags}
              />
            ))}
          </div>
          <button className="load-more-btn" onClick={handleMore}>
            More
          </button>
        </>
      ) : (
        <>
          <p className="posts-empty-text">
            There are no posts in {user?.role === "CREATOR" ? "your" : "the"}{" "}
            blog yet
          </p>
          <button className="link-button" onClick={handleAddPost}>
            Start it now!
          </button>
          <Modal title="Create Post" isOpen={isOpen} setIsOpen={setIsOpen}>
            <PostForm />
          </Modal>
        </>
      )}
    </div>
  );
}

const PostCard = ({
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
    <NavLink to={`/posts/${id}`}>
      <div className="post" style={{ backgroundImage: `url(${image})` }}>
        <div className="post-tags">
          {tags?.map((tag) => (
            <div className="post-tag" key={tag.name}>
              {tag.name}
            </div>
          ))}
        </div>
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
