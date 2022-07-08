import React from "react";

import LoginForm from "./forms/loginForm";

import "./auth.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <p>Login</p>
      <LoginForm />
      <p>
        Don`t have an account yet?{" "}
        <NavLink to="/registation">Create one.</NavLink>
      </p>
    </div>
  );
}
