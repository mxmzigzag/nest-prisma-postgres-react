import React from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetPostsByAuthorIdQuery } from "../store/api/post.api";

import ProfileLayout from "../layouts/profile.layout";
import Posts from "../features/Posts/posts";
import LoaderIcon from "../assets/svg/loader";
import Button from "../components/ui/button";

export default function MyPosts() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="My posts">
      {user?.id ? (
        user.role === "USER" ? (
          <BecomeCreatorNotification />
        ) : (
          <MyPostsGrid userId={user.id} />
        )
      ) : (
        <LoaderIcon />
      )}
    </ProfileLayout>
  );
}

const MyPostsGrid = ({ userId }: { userId: number }) => {
  const { data: posts = [], isLoading } = useGetPostsByAuthorIdQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  // @ts-ignore
  return isLoading ? <LoaderIcon /> : <Posts posts={posts} gridColNum={3} />;
};

const BecomeCreatorNotification = () => {
  const handleSendCreatorRequest = () => {
    console.log("become a creator!");
  };

  return (
    <div className="bcn-wrapper">
      <h3 className="bcn-title">No posts here yet!</h3>
      <p className="bcn-content">
        To start writing your own articles you need to become a{" "}
        <span className="bcn-highlight">creator</span>
      </p>
      <Button className="bcn-btn" onClick={handleSendCreatorRequest}>
        Send a request
      </Button>
    </div>
  );
};
