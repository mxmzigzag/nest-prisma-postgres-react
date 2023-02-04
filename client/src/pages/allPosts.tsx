import React, { useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetAllPostsQuery } from "../store/api/post.api";

import ProfileLayout from "../layouts/profile.layout";
import Posts from "../features/Posts/posts";
import Loader from "../components/ui/loader";

export default function AllPosts() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="All posts">
      {user ? <PostsGrid /> : <Loader />}
    </ProfileLayout>
  );
}

const PostsGrid = () => {
  const [limit, setLimit] = useState<number>(3);
  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useGetAllPostsQuery({
    limit,
    searchQuery: "",
  });

  const handleIncreaseLimit = () => {
    setLimit(limit + 3);
  };

  return isLoading || !postsData ? (
    <Loader />
  ) : (
    <Posts
      posts={postsData.posts}
      gridStyles={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 w-full mb-6`}
      handleIncreaseLimit={handleIncreaseLimit}
      isLoadMoreLoading={isFetching}
      showLoadMore={postsData.posts.length < postsData.totalCount}
    />
  );
};
