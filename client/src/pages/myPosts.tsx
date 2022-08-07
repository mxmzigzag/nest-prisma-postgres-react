import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetPostsByAuthorIdQuery } from "../store/api/post.api";
import {
  useCreateRequestMutation,
  useGetRequestIsSentByUserQuery,
} from "../store/api/request.api";

import { successToast } from "../components/ui/toast";
import ProfileLayout from "../layouts/profile.layout";
import Posts from "../features/Posts/posts";
import Button from "../components/ui/button";
import Loader from "../components/ui/loader";

type MyPostsGrid = {
  userId: string;
};

export default function MyPosts() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="My posts">
      {user ? (
        user.role === "USER" ? (
          <BecomeCreatorNotification userId={user.id} />
        ) : (
          <MyPostsGrid userId={user.id} />
        )
      ) : (
        <Loader />
      )}
    </ProfileLayout>
  );
}

const MyPostsGrid = ({ userId }: MyPostsGrid) => {
  const [limit, setLimit] = useState<number>(3);
  const { data: postsData, isLoading } = useGetPostsByAuthorIdQuery({
    userId,
    limit,
  });

  const handleIncreaseLimit = () => {
    setLimit(limit + 3);
  };

  return isLoading || !postsData ? (
    <Loader />
  ) : (
    <Posts
      posts={postsData.posts}
      gridColNum={3}
      handleIncreaseLimit={handleIncreaseLimit}
      isLoadMoreLoading={limit > postsData.posts.length}
      showLoadMore={postsData.posts.length < postsData.totalCount}
    />
  );
};

const BecomeCreatorNotification = ({ userId }: { userId: string }) => {
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  const { data: isReqSent = false, isLoading: isSentLoading } =
    useGetRequestIsSentByUserQuery({
      userId,
      type: "UPDATE_TO_CREATOR",
    });

  useEffect(() => {
    setIsRequestSent(isReqSent);
  }, [isReqSent]);

  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const handleSendCreatorRequest = async () => {
    try {
      const res = await createRequest({
        userId,
        type: "UPDATE_TO_CREATOR",
      }).unwrap();

      if (res.status) {
        setIsRequestSent(true);
        successToast("Request is sent!");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="bcn-wrapper">
      {isSentLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="bcn-title">No posts here yet!</h3>
          {isRequestSent ? (
            <p className="bcn-content">
              Your request for becoming a{" "}
              <span className="bcn-highlight">creator</span> is in work.
              <br />
              Wait till administration procces it!
            </p>
          ) : (
            <>
              <p className="bcn-content">
                To start writing your own articles you need to become a{" "}
                <span className="bcn-highlight">creator</span>
              </p>
              <Button
                className="bcn-btn"
                onClick={handleSendCreatorRequest}
                isLoading={isLoading}
              >
                Send a request
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};
