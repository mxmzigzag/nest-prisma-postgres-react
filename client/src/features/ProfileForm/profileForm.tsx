import React, { ChangeEvent, useState } from "react";

import { ProfileFormData, User } from "../../types/user.types";

import { useAuth } from "../../hooks/useAuth";
import { useUpdateProfileMutation } from "../../store/api/user.api";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast, successToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";

import UserIcon from "../../assets/svg/user";

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

  const handleUpload = async (e: any) => {
    if (formData.id) {
      const file = e.target.files[0];
      const newFormData = new FormData();
      newFormData.set("avatar", file);

      const user = await updateProfile({
        data: newFormData,
        userId: formData.id,
      }).unwrap();
      console.log("updated avatar", user);

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      successToast("User avatar updated");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      try {
        const newFormData = new FormData();
        Object.entries(formData).map(([key, value]) => {
          newFormData.append(key, value);
        });

        const user = await updateProfile({
          data: newFormData,
          userId: formData.id,
        }).unwrap();
        console.log("upd", user);

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        successToast("User data updated");
      } catch (err: any) {
        errorToast(err.message);
      }
    }
  };

  return (
    <>
      <form className="profile-form" onSubmit={onSubmit}>
        <div className="profile-form-avatar">
          <label htmlFor="avatar">
            {formData.avatar ? (
              <img
                src={`http://localhost:5000/${userData.avatar}`}
                alt="avatar"
              />
            ) : (
              <UserIcon width={200} height={200} />
            )}
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
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
        <Button
          type="submit"
          className="profile-form-btn"
          isLoading={isLoading}
        >
          Save
        </Button>
      </form>
    </>
  );
}
