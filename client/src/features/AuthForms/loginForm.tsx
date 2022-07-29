import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "../../store/api/auth.api";

import { setUser } from "../../store/slice/user.slice";
import { LoginData } from "../../types/user.types";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast } from "../../components/ui/toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    try {
      const { user } = await login(formData).unwrap();
      if (user) {
        dispatch(setUser({ user }));
        navigate("/profile");
      }
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
