import React from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetAllPostsQuery } from "../store/api/post.api";

import ProfileLayout from "../layouts/profile.layout";
import Posts from "../features/Posts/posts";
import LoaderIcon from "../assets/svg/loader";

export default function AllPosts() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="All posts">
      {user ? <PostsGrid /> : <LoaderIcon />}
    </ProfileLayout>
  );
}

const PostsGrid = () => {
  const { data: posts = [], isLoading } = useGetAllPostsQuery();
  console.log("posts", posts);

  // @ts-ignore
  return isLoading ? <LoaderIcon /> : <Posts posts={posts} gridColNum={3} />;
};
