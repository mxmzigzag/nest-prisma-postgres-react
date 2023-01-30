import React from "react";
import { NavLink } from "react-router-dom";

import UserPill from "./userPill";
import CategoryList from "./categoryList";

import Logo from "../../assets/svg/logo";

export const headerLink = "no-underline color-black px-4 text-xl";

export default function Header() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-offWhiteLight">
      <div className="flex items-center mx-auto py-4 px-6 w-full max-w-[1200px]">
        <NavLink to={"/"} tabIndex={-1}>
          <Logo
            width={70}
            height={57}
            className="mr-6 cursor-pointer transition-all hover:translate-y-1 hover:transition-all"
            onClick={handleScrollToTop}
          />
        </NavLink>
        <nav className="flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${headerLink} ${isActive && "!underline"}`
            }
          >
            Home
          </NavLink>
          <CategoryList />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${headerLink} ${isActive && "!underline"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `${headerLink} ${isActive && "!underline"}`
            }
          >
            Contacts
          </NavLink>
        </nav>
        <UserPill />
      </div>
    </div>
  );
}
