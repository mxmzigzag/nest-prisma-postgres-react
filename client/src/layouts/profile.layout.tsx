import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { logoutUser } from "../store/slice/user.slice";
import { useLogoutMutation } from "../store/api/auth.api";

import { errorToast } from "../components/ui/toast";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function ProfileLayout({ title, children }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const navItems = [
    { id: 0, name: "Profile", link: "/profile" },
    { id: 1, name: "My Posts", link: "/profile/posts" },
    { id: 2, name: "All users", link: "/users" },
    { id: 3, name: "Requests", link: "/requests" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser({}));
      navigate("/");
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
