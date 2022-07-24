import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import InputGroup from "../../components/forms/inputGroup";
import { errorToast, successToast } from "../../components/ui/toast";

type RegistrationFormData = {
  name: string;
  surname: string;
  userName: string;
  email: string;
  password: string;
};

type Errors = {
  [key: string]: string;
};

type TokenResponse = {
  token: string;
};

export default function RegistrationForm() {
  const { request } = useFetch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
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
    try {
      const data = await request<TokenResponse>(
        "registration",
        "POST",
        formData
      );

      if (data.token) {
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
    <>
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
        name="userName"
        placeholder="Username"
        value={formData.userName}
        error={errors.userName}
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
      <button className="btn" onClick={onSubmit}>
        Sign in
      </button>
    </>
  );
}
