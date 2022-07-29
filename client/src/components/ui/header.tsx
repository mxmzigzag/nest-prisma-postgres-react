import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import Logo from "../../assets/svg/logo";
import UserIcon from "../../assets/svg/user";

export default function Header() {
  const { isAuth } = useAuth();

  const navItems = [
    { id: 0, title: "Home", link: "/" },
    { id: 1, title: "Category", link: "/category" },
    { id: 2, title: "About", link: "/about" },
    { id: 3, title: "Contacts", link: "/contacts" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="header-bg">
      <div className="header-wrapper">
        <NavLink to={"/"}>
          <Logo
            width={70}
            height={57}
            className="logo"
            onClick={handleScrollToTop}
          />
        </NavLink>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) => `link ${isActive && "active-link"}`}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
        <NavLink to={`/${isAuth ? "profile" : "login"}`} className="user-btn">
          <div className="header-user-wrapper">
            <div className="header-user-info">
              <span className="header-user-name">user name</span>
              <div className="header-user-divider"></div>
              <span className="header-user-role">Creator</span>
            </div>
            <div className="header-user-img">
              <UserIcon />
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
