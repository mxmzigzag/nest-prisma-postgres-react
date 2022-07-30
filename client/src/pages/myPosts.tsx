import React from "react";
import LoaderIcon from "../assets/svg/loader";
import Posts from "../features/Posts/posts";
import { useAuth } from "../hooks/useAuth";
import ProfileLayout from "../layouts/profile.layout";
import { useGetPostsByAuthorIdQuery } from "../store/api/post.api";

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
