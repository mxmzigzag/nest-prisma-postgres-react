import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import ViewsIcon from "../../assets/svg/views";

type Tag = {
  name: string;
};

type Post = {
  id: number;
  title: string;
  image: string;
  description: string;
  body?: string;
  isPublished?: boolean;
  authorId: number;
  author: {
    username: string;
  };
  categoryId: number;
  category: {
    id: number;
    title: string;
    color: string;
  };
  viewsCount: number;
  tags: Tag[];
};

type Props = {
  posts: Post[];
  gridColNum?: number;
};

export default function Posts({ posts, gridColNum = 4 }: Props) {
  const { user } = useAuth();

  const handleAddPost = () => {
    console.log("add post");
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
              <Post
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
          <p>
            There are no posts in {user?.role === "CREATOR" ? "your" : "the"}{" "}
            blog yet
          </p>
          <button onClick={handleAddPost}>Start it now!</button>
        </>
      )}
    </div>
  );
}

const Post = ({
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
}: Post) => {
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
          <div className="post-author" onClick={() => console.log(authorId)}>
            {author.username}
          </div>
          <div className="post-views">
            <ViewsIcon className="post-views-icon" />
            {viewsCount}
          </div>
        </div>
      </div>
    </NavLink>
  );
};
