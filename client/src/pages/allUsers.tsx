import React from "react";

import { User } from "../types/user.types";

import { useAuth } from "../hooks/useAuth";
import { useGetAllUsersQuery } from "../store/api/user.api";

import ProfileLayout from "../layouts/profile.layout";
import Loader from "../components/ui/loader";

import UserIcon from "../assets/svg/user";
import LockIcon from "../assets/svg/lock";
import UnlockIcon from "../assets/svg/unlock";
import {
  useBanUserMutation,
  useUnbanUserMutation,
} from "../store/api/bannedUser.api";
import { errorToast, successToast } from "../components/ui/toast";

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
    <p>It&apos;s impossible! How are you get here?!</p>
  );
};

const UserCard = ({ user }: { user: User }) => {
  const [banUser] = useBanUserMutation();
  const [unbanUser] = useUnbanUserMutation();

  const handleBanUser = async () => {
    try {
      await banUser(user.id);
      successToast(`User ${user.username} has been banned!`);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  const handleUnbanUser = async () => {
    try {
      await unbanUser(user.id);
      successToast(`User ${user.username} is now free from a Ban-jail!`);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <div className="user-card">
      {user.banned ? <div className="banned-badge">Banned</div> : null}
      <div className="user-actions">
        {user.banned ? (
          <UnlockIcon
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={handleUnbanUser}
          />
        ) : (
          <LockIcon
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={handleBanUser}
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
