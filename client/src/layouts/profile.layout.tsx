import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { errorToast } from "../components/ui/toast";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function ProfileLayout({ title, children }: Props) {
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
    <div className="profile-wrapper">
      <ul className="profile-navbar">
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/profile/posts">My Posts</NavLink>
        </li>
        <li>
          <NavLink to="/users">All users</NavLink>
        </li>
        <li>
          <NavLink to="/requests">Requests</NavLink>
        </li>
        <li className="mt-auto">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
      <div className="profile-content">
        <h2 className="profile-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
