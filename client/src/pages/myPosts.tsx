import React from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetPostsByAuthorIdQuery } from "../store/api/post.api";

import ProfileLayout from "../layouts/profile.layout";
import Posts from "../features/Posts/posts";
import LoaderIcon from "../assets/svg/loader";

export default function MyPosts() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="My posts">
      {user?.id ? <MyPostsGrid userId={user.id} /> : <LoaderIcon />}
    </ProfileLayout>
  );
}

const MyPostsGrid = ({ userId }: { userId: number }) => {
  const { data: posts = [], isLoading } = useGetPostsByAuthorIdQuery(userId);

  // @ts-ignore
  return isLoading ? <LoaderIcon /> : <Posts posts={posts} gridColNum={3} />;
};
