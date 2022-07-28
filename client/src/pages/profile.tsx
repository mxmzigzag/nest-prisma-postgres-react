import React from "react";

import ProfileLayout from "../layouts/profile.layout";
import ProfileForm from "../features/ProfileForm/profileForm";
import useAuth from "../hooks/useAuth";

export type Profile = {
  id: number;
  name: string;
  surname: string;
  userName: string;
  email: string;
};

export default function Profile() {
  const { user } = useAuth();

  return (
    <ProfileLayout title="Profile">
      {user ? <ProfileForm userData={user} /> : <p>loading...</p>}
    </ProfileLayout>
  );
}
