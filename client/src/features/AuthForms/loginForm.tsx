import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginData } from "../../types/user.types";
import { schema } from "./login.schema";

import { useAuth } from "../../hooks/useAuth";
import { useLoginMutation } from "../../store/api/auth.api";

import { errorToast } from "../../components/ui/toast";
import InputGroup from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginUser, { isLoading }] = useLoginMutation();

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: LoginData) => {
    try {
      const data = await login(loginUser, formData);
      if (data) navigate("/profile");
    } catch (err: any) {
      errorToast(err.data.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center form-title">Log in</h1>
      <InputGroup
        label="Email"
        name="email"
        placeholder="E-mail"
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
        Log in
      </Button>
    </form>
  );
}
