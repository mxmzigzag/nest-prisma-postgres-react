import React, { useState } from "react";

import { Post } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";

import Modal from "../../components/ui/modal";
import PostForm from "../PostForm/postForm";
import { PostCard } from "./postCard";
import Button from "../../components/ui/button";

type Props = {
  posts: Partial<Post>[];
  gridColNum?: number;
  showLoadMore?: boolean;
  isLoadMoreLoading?: boolean;
  handleIncreaseLimit?: () => void;
};

export default function Posts({
  posts,
  gridColNum = 4,
  showLoadMore = true,
  isLoadMoreLoading = false,
  handleIncreaseLimit,
}: Props) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          {showLoadMore ? (
            <Button
              className="load-more-btn"
              onClick={handleIncreaseLimit}
              isLoading={isLoadMoreLoading}
            >
              More
            </Button>
          ) : null}
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
