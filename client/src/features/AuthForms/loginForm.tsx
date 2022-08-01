import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginData } from "../../types/user.types";

import { useAuth } from "../../hooks/useAuth";
import { useLoginMutation } from "../../store/api/auth.api";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading }] = useLoginMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(loginUser, formData);
      if (data) navigate("/profile");
    } catch (err: any) {
      errorToast(err.data.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h1 className="text-center form-title">Log in</h1>
      <InputGroup
        label="Email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={onChange}
      />
      <InputGroup
        label="Password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
      />
      <Button type="submit" isLoading={isLoading}>
        Log in
      </Button>
    </form>
  );
}
