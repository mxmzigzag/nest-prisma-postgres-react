import React from "react";

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
  const { data: posts = [], isLoading } = useGetAllPostsQuery();

  return isLoading ? <Loader /> : <Posts posts={posts} gridColNum={3} />;
};
