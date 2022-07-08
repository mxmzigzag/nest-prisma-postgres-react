import React from "react";
import { NavLink } from "react-router-dom";

import RegistrationForm from "./forms/registrationForm";

import "./auth.css";

export default function Register() {
  return (
    <div>
      <p>Register</p>
      <RegistrationForm />
      <p>
        Already have an account?
        <NavLink to="/login">Log in.</NavLink>
      </p>
    </div>
  );
}
