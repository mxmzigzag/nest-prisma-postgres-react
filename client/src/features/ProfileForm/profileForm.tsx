import React, { ChangeEvent, useState } from "react";

import { ProfileFormData, User } from "../../types/user.types";

import { useUpdateProfileMutation } from "../../store/api/user.api";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast, successToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";

type Props = {
  userData: User;
};

export default function ProfileForm({ userData }: Props) {
  const [formData, setFormData] = useState<ProfileFormData>(userData);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    try {
      const res = await updateProfile(formData).unwrap();
      console.log("updated", res);
      successToast("User data updated");
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  return (
    <>
      <div className="profile-form">
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
          value={formData.userName || ""}
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
      </div>
      <Button
        className="profile-form-btn"
        isLoading={isLoading}
        onClick={onSubmit}
      >
        Save
      </Button>
    </>
  );
}
