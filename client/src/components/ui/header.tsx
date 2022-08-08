import React from "react";
import { NavLink } from "react-router-dom";

import UserPill from "./userPill";

import Logo from "../../assets/svg/logo";
import CategoryList from "./categoryList";

export default function Header() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="header-bg">
      <div className="header-wrapper">
        <NavLink to={"/"} tabIndex={-1}>
          <Logo
            width={70}
            height={57}
            className="logo"
            onClick={handleScrollToTop}
          />
        </NavLink>
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `link ${isActive && "active-link"}`}
          >
            Home
          </NavLink>
          <CategoryList />
          <NavLink
            to="/about"
            className={({ isActive }) => `link ${isActive && "active-link"}`}
          >
            About
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) => `link ${isActive && "active-link"}`}
          >
            Contacts
          </NavLink>
        </nav>
        <UserPill />
      </div>
    </div>
  );
}
