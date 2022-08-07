import React, { useState } from "react";

import { Post } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";

import Modal from "../../components/ui/modal";
import PostForm from "../PostForm/postForm";
import { PostCard } from "./postCard";

type Props = {
  posts: Partial<Post>[];
  gridColNum?: number;
};

export default function Posts({ posts, gridColNum = 4 }: Props) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          {user?.role === "CREATOR" ? (
            <button className="link-button" onClick={() => setIsOpen(true)}>
              Start it now!
            </button>
          ) : null}
          <Modal title="Create Post" isOpen={isOpen} setIsOpen={setIsOpen}>
            <PostForm setIsOpen={setIsOpen} />
          </Modal>
        </>
      )}
    </div>
  );
}
