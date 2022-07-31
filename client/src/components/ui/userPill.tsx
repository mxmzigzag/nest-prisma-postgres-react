import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import UserIcon from "../../assets/svg/user";

export default function UserPill() {
  const { user, isAuth } = useAuth();

  return (
    <NavLink to={`/${isAuth ? "profile" : "login"}`} className="user-btn">
      <div className="header-user-wrapper">
        {isAuth && user ? (
          <div className="header-user-info">
            <span className="header-user-name">{user.username}</span>
            <div className="header-user-divider"></div>
            <span className="header-user-role">{user.role}</span>
          </div>
        ) : null}
        <div className="header-user-img">
          <UserIcon />
        </div>
      </div>
    </NavLink>
  );
}
