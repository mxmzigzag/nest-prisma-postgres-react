import React, { ChangeEvent, useState } from "react";

import { useFetch } from "../../hooks/useFetch";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast } from "../../components/ui/toast";

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
      const data = await request("login", "POST", formData);
      console.log("resp", data);
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
      <button className="btn" onClick={onSubmit}>
        Log in
      </button>
    </>
  );
}
