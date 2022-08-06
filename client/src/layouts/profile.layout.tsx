import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useLogoutMutation } from "../store/api/auth.api";

import { errorToast } from "../components/ui/toast";
import Button from "../components/ui/button";

type Props = {
  title: string;
  btnTitle?: string;
  btnOnClick?: () => void;
  children: JSX.Element | JSX.Element[];
};

export default function ProfileLayout({
  title,
  btnTitle,
  btnOnClick,
  children,
}: Props) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [logoutUser] = useLogoutMutation();

  const navItems = [
    {
      id: 0,
      name: "Profile",
      link: "/profile",
      allowedRoles: ["USER", "CREATOR", "ADMIN"],
    },
    {
      id: 1,
      name: "My Posts",
      link: "/profile/posts",
      allowedRoles: ["USER", "CREATOR"],
    },
    {
      id: 2,
      name: "All Posts",
      link: "/admin/posts",
      allowedRoles: ["ADMIN"],
    },
    { id: 3, name: "All Users", link: "/admin/users", allowedRoles: ["ADMIN"] },
    {
      id: 4,
      name: "Categories",
      link: "/admin/categories",
      allowedRoles: ["ADMIN"],
    },
    {
      id: 5,
      name: "Requests",
      link: "/admin/requests",
      allowedRoles: ["ADMIN"],
    },
  ];

  const handleLogout = async () => {
    try {
      const data = await logout(logoutUser);
      if (data) navigate("/");
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  if (!user) return null;
  return (
    <div className="profile-wrapper">
      <ul className="profile-navbar">
        {navItems
          .filter((item) => item.allowedRoles.includes(user.role))
          .map((item) => (
            <li key={item.id}>
              <NavLink to={item.link}>{item.name}</NavLink>
            </li>
          ))}
        <li className="mt-auto">
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      </ul>
      <div className="profile-content">
        <div className="profile-content-row">
          <h2 className="profile-title">{title}</h2>
          {btnTitle ? (
            <Button onClick={btnOnClick} className="profile-btn">
              {btnTitle}
            </Button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
