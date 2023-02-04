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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
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
    <div className="group flex flex-col items-center bg-white rounded-lg py-5 px-3 relative shadow-bShadow transition-all hover:shadow-bShadowHover hover:transition-all">
      {user.banned ? (
        <div className="absolute top-2 left-2 bg-bGrayLight rounded-lg px-1.5 text-sm">
          Banned
        </div>
      ) : null}
      <div className="lg:invisible absolute top-2 right-2 group-hover:visible">
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
      <div className="flex items-center justify-center mb-2.5">
        <UserIcon width={50} height={50} />
      </div>
      <h5 className="text-lg mb-1">{user.username}</h5>
      <p className="text-sm text-bGray mb-0">
        {user.name} {user.surname}
      </p>
      <p className="text-sm text-bGray">{user.email}</p>
    </div>
  );
};
