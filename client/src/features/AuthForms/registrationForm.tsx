import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RegistrationData } from "../../types/user.types";
import { Errors } from "../../types/common.types";

import { useAuth } from "../../hooks/useAuth";
import { useRegistrationMutation } from "../../store/api/auth.api";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast, successToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { registration } = useAuth();

  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const [registerUser, { isLoading }] = useRegistrationMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await registration(registerUser, formData);
      if (data) {
        successToast("You have been registered!");
        navigate("/");
      }
    } catch (err: any) {
      if (!err.message) {
        setErrors(err);
      } else {
        errorToast(err);
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h1 className="text-center form-title">Sign in</h1>
      <InputGroup
        label="Name"
        name="name"
        placeholder="Name"
        value={formData.name}
        error={errors.name}
        onChange={onChange}
      />
      <InputGroup
        label="Surname"
        name="surname"
        placeholder="Surname"
        value={formData.surname}
        error={errors.surname}
        onChange={onChange}
      />
      <InputGroup
        label="Username"
        name="username"
        placeholder="Username"
        value={formData.username}
        error={errors.username}
        onChange={onChange}
      />
      <InputGroup
        label="Email"
        name="email"
        placeholder="Email"
        value={formData.email}
        error={errors.email}
        onChange={onChange}
      />
      <InputGroup
        label="Password"
        name="password"
        placeholder="Password"
        value={formData.password}
        error={errors.password}
        onChange={onChange}
      />
      <Button type="submit" isLoading={isLoading}>
        Sign in
      </Button>
    </form>
  );
}
