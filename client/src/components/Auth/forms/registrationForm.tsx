import React, { ChangeEvent, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
// import InputGroup from "../../Inputs/inputGroup/inputGroup";

type RegistrationFormData = {
  name: string;
  surname: string;
  userName: string;
  email: string;
  password: string;
};

export default function RegistrationForm() {
  const { request } = useFetch();
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    surname: "",
    userName: "",
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    const data = await request("register", "POST", formData);
    console.log("data", data);
  };

  return (
    <>
      <h1 className="text-center form-title">Sign in</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={onChange}
      />
      <input
        type="text"
        name="surname"
        placeholder="surname"
        value={formData.surname}
        onChange={onChange}
      />
      <input
        type="text"
        name="userName"
        placeholder="User Name"
        value={formData.userName}
        onChange={onChange}
      />
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
