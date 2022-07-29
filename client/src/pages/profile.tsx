import React from "react";
import { useSelector } from "react-redux";

import { getUser } from "../store/slice/user.slice";

import ProfileLayout from "../layouts/profile.layout";
import ProfileForm from "../features/ProfileForm/profileForm";
import LoaderIcon from "../assets/svg/loader";

export default function Profile() {
  const user = useSelector(getUser);

  return (
    <ProfileLayout title="Profile">
      {user ? <ProfileForm userData={user} /> : <LoaderIcon />}
    </ProfileLayout>
  );
}
