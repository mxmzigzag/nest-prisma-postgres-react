import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ProfileFormData, User } from "../../types/user.types";
import { schema } from "./profileForm.schema";

import { useAuth } from "../../hooks/useAuth";
import { useUpdateProfileMutation } from "../../store/api/user.api";

import { errorToast, successToast } from "../../components/ui/toast";
import InputGroup from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";

import UserIcon from "../../assets/svg/user";

type Props = {
  userData: User;
};

export default function ProfileForm({ userData }: Props) {
  const { setUser } = useAuth();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const defaultValues = {
    id: userData.id,
    name: userData.name,
    surname: userData.surname,
    username: userData.username,
    email: userData.email,
    avatar: userData.avatar,
  };

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const formState = watch();

  const handleUpload = async (e: any) => {
    if (formState.id) {
      const file = e.target.files[0];
      const newFormData = new FormData();
      newFormData.set("avatar", file);

      const user = await updateProfile({
        data: newFormData,
        userId: formState.id,
      }).unwrap();

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      successToast("User avatar updated");
    }
  };

  const onSubmit = async (formData: ProfileFormData) => {
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

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        successToast("User data updated");
      } catch (err: any) {
        errorToast(err.message);
      }
    }
  };

  return (
    <form className="flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center w-full mb-4">
        <label
          htmlFor="avatar"
          className="flex rounded-full overflow-hidden bg-white border-2  border-black p-2.5 cursor-pointer"
        >
          {formState.avatar ? (
            <img
              src={`${process.env.APP_URL}/${formState.avatar}`}
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
          className="hidden w-0 h-0"
          onChange={handleUpload}
        />
      </div>
      <InputGroup
        label="Name"
        name="name"
        placeholder="Name"
        register={register}
        error={errors.name?.message}
        fullWidth={false}
      />
      <InputGroup
        label="Surname"
        name="surname"
        placeholder="Surname"
        register={register}
        error={errors.surname?.message}
        fullWidth={false}
      />
      <InputGroup
        label="Username"
        name="username"
        placeholder="Username"
        register={register}
        error={errors.username?.message}
        fullWidth={false}
      />
      <InputGroup
        label="Email"
        name="email"
        placeholder="E-mail"
        register={register}
        error={errors.email?.message}
        fullWidth={false}
      />
      <Button
        type="submit"
        className="w-full lg:max-w-[150px] lg:ml-auto"
        isLoading={isLoading}
      >
        Save
      </Button>
    </form>
  );
}
