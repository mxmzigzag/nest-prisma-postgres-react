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
  const { data: posts = [], isLoading } = useGetAllPostsQuery({ limit });

  const handleIncreaseLimit = () => {
    setLimit(limit + 3);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Posts
      posts={posts}
      gridColNum={3}
      handleIncreaseLimit={handleIncreaseLimit}
    />
  );
};
