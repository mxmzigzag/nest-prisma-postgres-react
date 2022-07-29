import React from "react";

import { useAuth } from "../hooks/useAuth";

import ProfileLayout from "../layouts/profile.layout";
import ProfileForm from "../features/ProfileForm/profileForm";
import LoaderIcon from "../assets/svg/loader";

export default function Profile() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="Profile">
      {user ? <ProfileForm userData={user} /> : <LoaderIcon />}
    </ProfileLayout>
  );
}
