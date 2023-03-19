import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/auth.layout";
import RegistrationForm from "../features/AuthForms/registrationForm";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);

  return (
    <AuthLayout>
      <RegistrationForm />
      <p className="text-base mt-2.5">
        Already have an account? <NavLink to="/login">Log in.</NavLink>
      </p>
    </AuthLayout>
  );
}
