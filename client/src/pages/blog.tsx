import React, { useState } from "react";

import { useGetAllPostsQuery } from "../store/api/post.api";

import BlogActionBar from "../features/BlogActionBar/blogActionBar";
import Posts from "../features/Posts/posts";
import Loader from "../components/ui/loader";

export default function Blog() {
  const [limit, setLimit] = useState<number>(4);
  const { data: postsData, isLoading } = useGetAllPostsQuery({ limit });

  const handleIncreaseLimit = () => {
    setLimit(limit + 4);
  };
  return (
    <div className="blog-wrapper">
      {isLoading || !postsData ? (
        <Loader />
      ) : (
        <>
          <BlogActionBar />
          <Posts
            posts={postsData.posts}
            handleIncreaseLimit={handleIncreaseLimit}
            isLoadMoreLoading={limit > postsData.posts.length}
            showLoadMore={postsData.posts.length < postsData.totalCount}
          />
        </>
      )}
    </div>
  );
}
