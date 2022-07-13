import React, { ChangeEvent, useState } from "react";

import { useFetch } from "../../../hooks/useFetch";

import InputGroup from "../../common/Inputs/inputGroup/inputGroup";
import { errorToast } from "../../common/Toast/toast";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { request } = useFetch();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    try {
      await request("login", "POST", formData);
    } catch (err: any) {
      errorToast(err);
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
      <button onClick={onSubmit}>Log in</button>
    </>
  );
}
