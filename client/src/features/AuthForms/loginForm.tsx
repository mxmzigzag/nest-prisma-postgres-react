import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import InputGroup from "../../components/forms/inputGroup";
import { errorToast } from "../../components/ui/toast";

export type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    try {
      const token = await login(formData);
      if (token) navigate("/profile");
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  return (
    <>
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
      <button className="btn" onClick={onSubmit}>
        Log in
      </button>
    </>
  );
}
