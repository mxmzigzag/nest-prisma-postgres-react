import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import UserIcon from "../../assets/svg/user";

export default function UserPill() {
  const { user, isAuth } = useAuth();

  return (
    <NavLink
      to={`/${isAuth ? "profile" : "login"}`}
      className="flex items-center justify-center color-black ml-auto"
    >
      <div className="flex items-center border-[1px] border-solid border-bBrown rounded-[50px] bg-bBrown">
        {isAuth && user ? (
          <div className="flex flex-col items-center py-1.5 pl-2.5 pr-0.5">
            <span className="text-sm leading-none">{user.username}</span>
            <div className="w-full h-[1px] bg-black my-1"></div>
            <span className="text-xs leading-none">{user.role}</span>
          </div>
        ) : null}
        <div className="rounded-full overflow-hidden border-[1px] border-solid border-black leading-[0px] p-2.5">
          {user?.avatar ? (
            <img
              src={`http://localhost:5000/${user.avatar}`}
              alt="avatar"
              className="max-w-[24px]"
            />
          ) : (
            <UserIcon />
          )}
        </div>
      </div>
    </NavLink>
  );
}
