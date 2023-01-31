import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegistrationData } from "../../types/user.types";
import { schema } from "./registration.schema";

import { useAuth } from "../../hooks/useAuth";
import { useRegistrationMutation } from "../../store/api/auth.api";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast, successToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";
import Upload from "../../components/forms/upload";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { registration } = useAuth();

  const [registerUser, { isLoading }] = useRegistrationMutation();

  const defaultValues = {
    name: "",
    surname: "",
    username: "",
    image: "" as unknown as File,
    email: "",
    password: "",
  };

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleFileUpload = (file: File) => {
    setValue("image", file);
  };

  const onSubmit = async (formData: RegistrationData) => {
    try {
      const newFormData = new FormData();
      Object.entries(formData).map(([key, value]) => {
        newFormData.append(key, value);
      });

      const userToken = await registration(registerUser, newFormData);
      if (userToken.user && userToken.token) {
        successToast("You have been registered!");
        navigate("/");
      }
    } catch (err: any) {
      errorToast(err);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center text-[20px] uppercase mb-4">Sign in</h1>
      <InputGroup
        label="Name"
        name="name"
        placeholder="Name"
        register={register}
        error={errors.name?.message}
      />
      <InputGroup
        label="Surname"
        name="surname"
        placeholder="Surname"
        register={register}
        error={errors.surname?.message}
      />
      <InputGroup
        label="Username"
        name="username"
        placeholder="Username"
        register={register}
        error={errors.username?.message}
      />
      <Upload
        label="Avatar"
        name="avatar"
        setValue={handleFileUpload}
        error={errors.image?.message}
      />
      <InputGroup
        label="Email"
        name="email"
        placeholder="Email"
        register={register}
        error={errors.email?.message}
      />
      <InputGroup
        type="password"
        label="Password"
        name="password"
        placeholder="Password"
        register={register}
        error={errors.password?.message}
      />
      <Button type="submit" isLoading={isLoading}>
        Sign in
      </Button>
    </form>
  );
}
