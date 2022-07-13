import React, { ChangeEvent, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import InputGroup from "../../common/Inputs/inputGroup/inputGroup";

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
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
      />
      <InputGroup
        label="Name"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={onChange}
      />
      <InputGroup
        label="Surname"
        name="surname"
        placeholder="Surname"
        value={formData.surname}
        onChange={onChange}
      />
      <InputGroup
        label="Username"
        name="userName"
        placeholder="Username"
        value={formData.userName}
        onChange={onChange}
      />
      <InputGroup
        label="Email"
        name="email"
        placeholder="Email"
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
