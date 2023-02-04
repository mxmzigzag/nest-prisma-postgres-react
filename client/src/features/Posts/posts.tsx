import React, { useState } from "react";

import { Role } from "../../types/user.types";
import { Post } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";

import Modal from "../../components/ui/modal";
import PostForm from "../PostForm/postForm";
import PostCard from "./postCard";
import Button from "../../components/ui/button";

type Props = {
  posts: Partial<Post>[];
  gridStyles?: string;
  showLoadMore?: boolean;
  isLoadMoreLoading?: boolean;
  isUserPosts?: boolean;
  handleIncreaseLimit?: () => void;
};

export default function Posts({
  posts,
  gridStyles = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full mb-6",
  showLoadMore = true,
  isLoadMoreLoading = false,
  isUserPosts = false,
  handleIncreaseLimit,
}: Props) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      {posts.length ? (
        <>
          <div className={gridStyles}>
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
              className="text-lg !py-1 !sm:py-2.5 px-5 max-w-[150px] rounded-lg border-1 border-bBrown bg-bBrown cursor-pointer"
              onClick={handleIncreaseLimit}
              isLoading={isLoadMoreLoading}
            >
              More
            </Button>
          ) : null}
        </>
      ) : (
        <>
          <p className="text-lg mx-auto mb-2.5">
            There are no posts in{" "}
            {user?.role === Role.CREATOR && isUserPosts ? "your" : "the"} blog
            yet
          </p>
          {user?.role === Role.CREATOR && isUserPosts ? (
            <button
              className="bg-none border-0 outline-0 color-bBrownHover underline cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
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
