import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Role } from "../types/user.types";

import { useAuth } from "../hooks/useAuth";
import { useGetNumberOfUnansweredQuery } from "../store/api/request.api";

import { errorToast } from "../components/ui/toast";
import Button from "../components/ui/button";
import useWindowSize from "../hooks/useWindowSize";

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
  const { isMob } = useWindowSize();

  const { data: requestNotifications } = useGetNumberOfUnansweredQuery();

  const navItems = [
    {
      id: 0,
      name: "Profile",
      link: "/profile",
      allowedRoles: [Role.USER, Role.CREATOR, Role.ADMIN],
    },
    {
      id: 1,
      name: "My Posts",
      link: "/profile/posts",
      allowedRoles: [Role.USER, Role.CREATOR],
    },
    {
      id: 2,
      name: "All Posts",
      link: "/admin/posts",
      allowedRoles: [Role.ADMIN],
    },
    {
      id: 3,
      name: "All Users",
      link: "/admin/users",
      allowedRoles: [Role.ADMIN],
    },
    {
      id: 4,
      name: "Categories",
      link: "/admin/categories",
      allowedRoles: [Role.ADMIN],
    },
    {
      id: 5,
      name: "Requests",
      notifications: requestNotifications,
      link: "/admin/requests",
      allowedRoles: [Role.ADMIN],
    },
  ];

  const handleLogout = async () => {
    try {
      const data = await logout();
      if (data) navigate("/");
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  if (!user) return null;
  return (
    <div className="flex flex-1 flex-col lg:flex-row w-full max-w-[1200px] mx-auto px-4 pb-4 lg:px-6">
      <ul className="flex flex-row lg:flex-col lg:w-[200px] lg:border-r-[1px] lg:border-r-black py-2.5 lg:py-6 lg:pr-4 list-none overflow-x-auto">
        {navItems
          .filter((item) => item.allowedRoles.includes(user.role))
          .map((item) => (
            <li key={item.id} className="py-2.5 pr-2.5 last:pr-0 relative">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `"text-black text-lg whitespace-nowrap relative" ${
                    isActive && "!underline"
                  }`
                }
              >
                {item.name}{" "}
                {item.notifications ? (
                  <span className="absolute -top-[3px] -right-4 bg-bRed rounded-full text-xxs flex items-center justify-center w-4 h-4 text-white">
                    {item.notifications}
                  </span>
                ) : null}
              </NavLink>
            </li>
          ))}
        {!isMob && (
          <li className="mt-auto">
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        )}
      </ul>
      <div className="flex flex-col w-full lg:p-6">
        <div className="flex item-center justify-between mb-6">
          <h2 className="text-3xl">{title}</h2>
          {btnTitle ? (
            <Button
              onClick={btnOnClick}
              className="max-w-[150px] lg:max-w-[200px]"
            >
              {btnTitle}
            </Button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
