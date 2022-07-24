import React from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { errorToast } from "../components/ui/toast";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (err: any) {
      console.log(err);
      errorToast(err.message);
    }
  };

  return (
    <div>
      <span>Profile</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
