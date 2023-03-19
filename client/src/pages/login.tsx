import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import AuthLayout from "../layouts/auth.layout";
import LoginForm from "../features/AuthForms/loginForm";

export default function Login() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);

  return (
    <AuthLayout>
      <LoginForm />
      <p className="text-base mt-2.5">
        Don`t have an account yet?{" "}
        <NavLink to="/registation">Create one.</NavLink>
      </p>
    </AuthLayout>
  );
}
