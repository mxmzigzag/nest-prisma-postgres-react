import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetPostsByAuthorIdQuery } from "../store/api/post.api";
import {
  useCreateRequestMutation,
  useGetRequestIsSentByUserQuery,
} from "../store/api/request.api";

import ProfileLayout from "../layouts/profile.layout";
import Posts from "../features/Posts/posts";
import LoaderIcon from "../assets/svg/loader";
import Button from "../components/ui/button";
import { successToast } from "../components/ui/toast";

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
        <LoaderIcon />
      )}
    </ProfileLayout>
  );
}

const MyPostsGrid = ({ userId }: { userId: string }) => {
  const { data: posts = [], isLoading } = useGetPostsByAuthorIdQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  // @ts-ignore
  return isLoading ? <LoaderIcon /> : <Posts posts={posts} gridColNum={3} />;
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
        <LoaderIcon />
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
