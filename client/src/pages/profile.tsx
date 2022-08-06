import React from "react";

import { useAuth } from "../hooks/useAuth";

import ProfileLayout from "../layouts/profile.layout";
import ProfileForm from "../features/ProfileForm/profileForm";
import Loader from "../components/ui/loader";

export default function Profile() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="Profile">
      {user ? <ProfileForm userData={user} /> : <Loader />}
    </ProfileLayout>
  );
}
