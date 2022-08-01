import React, { ChangeEvent, useState } from "react";

import { ProfileFormData, User } from "../../types/user.types";

import { useAuth } from "../../hooks/useAuth";
import { useUpdateProfileMutation } from "../../store/api/user.api";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast, successToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";

type Props = {
  userData: User;
};

export default function ProfileForm({ userData }: Props) {
  const { setUser } = useAuth();

  const [formData, setFormData] = useState<ProfileFormData>(userData);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await updateProfile(formData).unwrap();
      console.log("upd", user);

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      successToast("User data updated");
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  return (
    <>
      <form className="profile-form" onSubmit={onSubmit}>
        <InputGroup
          label="Name"
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={onChange}
          fullWidth={false}
        />
        <InputGroup
          label="Surname"
          name="surname"
          placeholder="Surname"
          value={formData.surname || ""}
          onChange={onChange}
          fullWidth={false}
        />
        <InputGroup
          label="Username"
          name="username"
          placeholder="Username"
          value={formData.username || ""}
          onChange={onChange}
          fullWidth={false}
        />
        <InputGroup
          label="Email"
          name="email"
          placeholder="E-mail"
          value={formData.email || ""}
          onChange={onChange}
          fullWidth={false}
        />
      </form>
      <Button type="submit" className="profile-form-btn" isLoading={isLoading}>
        Save
      </Button>
    </>
  );
}
