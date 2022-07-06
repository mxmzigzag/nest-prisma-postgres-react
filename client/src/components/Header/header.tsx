import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/svg/logo";
import SearchInput from "../SearchInput/searchInput";

import "./header.css";

export default function Header() {
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
    <div className="headerBg">
      <div className="headerWrapper">
        <Logo
          width={50}
          height={37}
          className="logo"
          onClick={handleScrollToTop}
        />
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) => (isActive ? "activeLink" : "link")}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
        <div className="searchWrapper">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
