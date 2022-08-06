import React from "react";

import { User } from "../types/user.types";

import { useAuth } from "../hooks/useAuth";
import { useGetAllUsersQuery } from "../store/api/user.api";

import ProfileLayout from "../layouts/profile.layout";
import Loader from "../components/ui/loader";

import UserIcon from "../assets/svg/user";
import LockIcon from "../assets/svg/lock";
import UnlockIcon from "../assets/svg/unlock";

export default function AllUsers() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="All users">
      {user ? <UsersGrid /> : <Loader />}
    </ProfileLayout>
  );
}

const UsersGrid = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();

  return isLoading ? (
    <Loader />
  ) : users.length ? (
    <div className="users-wrapper">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  ) : (
    <p>It&apos;s impossible! How you are here?!</p>
  );
};

const UserCard = ({ user }: { user: User }) => {
  const handleBanUser = () => {
    console.log("Ban this user:", user.id);
  };

  const handleUnbanUser = () => {
    console.log("Unban this user:", user.id);
  };

  return (
    <div className="user-card">
      <div className="user-actions">
        {user.banned ? (
          <LockIcon
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={handleBanUser}
          />
        ) : (
          <UnlockIcon
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={handleUnbanUser}
          />
        )}
      </div>
      <div className="user-img">
        <UserIcon width={50} height={50} />
      </div>
      <h5 className="user-username">{user.username}</h5>
      <p className="user-namestring">
        {user.name} {user.surname}
      </p>
      <p className="user-mail">{user.email}</p>
    </div>
  );
};
