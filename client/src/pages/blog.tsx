import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useGetAllPostsQuery } from "../store/api/post.api";
import { getBlogState } from "../store/slice/blog.slice";

import BlogActionBar from "../features/BlogActionBar/blogActionBar";
import Posts from "../features/Posts/posts";
import Loader from "../components/ui/loader";

export default function Blog() {
  const { searchQuery, popular, date, category, tags } =
    useSelector(getBlogState);
  const [limit, setLimit] = useState<number>(4);

  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useGetAllPostsQuery({
    limit,
    searchQuery,
    popular,
    date,
    category,
    tags,
  });

  const handleIncreaseLimit = () => {
    setLimit(limit + 4);
  };
  return (
    <div className="flex flex-col">
      {isLoading || !postsData ? (
        <Loader />
      ) : (
        <>
          <BlogActionBar />
          <Posts
            posts={postsData.posts}
            handleIncreaseLimit={handleIncreaseLimit}
            isLoadMoreLoading={isFetching}
            showLoadMore={postsData.posts.length < postsData.totalCount}
          />
        </>
      )}
    </div>
  );
}
