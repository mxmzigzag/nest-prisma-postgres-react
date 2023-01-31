import React from "react";
import { NavLink } from "react-router-dom";

import AuthLayout from "../layouts/auth.layout";
import RegistrationForm from "../features/AuthForms/registrationForm";

export default function Register() {
  return (
    <AuthLayout>
      <RegistrationForm />
      <p className="text-base mt-2.5">
        Already have an account? <NavLink to="/login">Log in.</NavLink>
      </p>
    </AuthLayout>
  );
}
