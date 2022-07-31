import React from "react";

import { useAuth } from "../hooks/useAuth";
import { useGetAllUsersQuery } from "../store/api/user.api";

import ProfileLayout from "../layouts/profile.layout";
import LoaderIcon from "../assets/svg/loader";

export default function AllUsers() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="All users">
      {user ? <UsersGrid /> : <LoaderIcon />}
    </ProfileLayout>
  );
}

const UsersGrid = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  console.log("users", users, isLoading);

  // return isLoading ? <LoaderIcon /> : <Posts posts={posts} gridColNum={3} />;
  return <LoaderIcon />;
};
