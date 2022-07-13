import React from "react";
import { NavLink } from "react-router-dom";

import AuthLayout from "./Layout/authLayout";
import LoginForm from "./forms/loginForm";

import "./auth.css";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
      <p className="form-undertext">
        Don`t have an account yet?{" "}
        <NavLink to="/registation">Create one.</NavLink>
      </p>
    </AuthLayout>
  );
}
