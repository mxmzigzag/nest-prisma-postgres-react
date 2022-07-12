import React, { ChangeEvent, useState } from "react";
// import InputGroup from "../../Inputs/inputGroup/inputGroup";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    console.log(formData);
  };

  return (
    <>
      <h1 className="text-center form-title">Log in</h1>
      <input
        type="text"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={onChange}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
      />
      {/* <InputGroup />
      <InputGroup /> */}
      <button onClick={onSubmit}>Log in</button>
    </>
  );
}
