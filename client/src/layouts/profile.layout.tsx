import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useLogoutMutation } from "../store/api/auth.api";

import { errorToast } from "../components/ui/toast";
import Button from "../components/ui/button";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function ProfileLayout({ title, children }: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [logoutUser] = useLogoutMutation();

  const navItems = [
    { id: 0, name: "Profile", link: "/profile" },
    { id: 1, name: "My Posts", link: "/profile/posts" },
    { id: 2, name: "All users", link: "/users" },
    { id: 3, name: "Requests", link: "/requests" },
  ];

  const handleLogout = async () => {
    try {
      const data = await logout(logoutUser);
      if (data) navigate("/");
    } catch (err: any) {
      errorToast(err.message);
    }
  };
  return (
    <div className="profile-wrapper">
      <ul className="profile-navbar">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink to={item.link}>{item.name}</NavLink>
          </li>
        ))}
        <li className="mt-auto">
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      </ul>
      <div className="profile-content">
        <h2 className="profile-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
