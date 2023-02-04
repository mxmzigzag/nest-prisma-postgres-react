import React, { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";

import { useAuth } from "../../hooks/useAuth";
import useWindowSize from "../../hooks/useWindowSize";

import { errorToast } from "./toast";
import UserPill from "./userPill";
import CategoryList from "./categoryList";
import Button from "./button";

import Logo from "../../assets/svg/logo";

export const headerLink = "no-underline color-black px-4 text-xl";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isMob } = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseMobMenu = useCallback(() => {
    if (isMob) setIsOpen(false);
  }, [isMob]);

  const handleLogout = async () => {
    try {
      const data = await logout();
      if (data) navigate("/");
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  return (
    <div
      className={`bg-offWhiteLight ${
        isOpen && "fixed top-0 left-0 right-0 z-[100]"
      }`}
    >
      <div className="relative flex items-center mx-auto py-4 px-4 sm:px-6 w-full max-w-[1200px]">
        <NavLink
          to={"/"}
          tabIndex={-1}
          className="mr-6"
          onClick={handleCloseMobMenu}
        >
          <Logo
            width={70}
            height={57}
            className="cursor-pointer transition-all hover:translate-y-1 hover:transition-all"
            onClick={handleScrollToTop}
          />
        </NavLink>
        {isMob ? (
          <div className="ml-auto">
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
            <div
              className={`absolute top-[89px] w-full min-h-screen bg-offWhiteLight py-4 z-20 border-t-[1px] border-t-black transition-all ${
                isOpen ? "right-0 transition-all" : "-right-full"
              }`}
            >
              <UserPill handleCloseMobMenu={handleCloseMobMenu} />
              <NavList isMob={isMob} handleCloseMobMenu={handleCloseMobMenu} />
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        ) : (
          <>
            <NavList isMob={isMob} handleCloseMobMenu={handleCloseMobMenu} />
            <UserPill handleCloseMobMenu={handleCloseMobMenu} />
          </>
        )}
      </div>
    </div>
  );
}

type NavListProps = {
  isMob: boolean;
  handleCloseMobMenu: () => void;
};

const NavList = ({ isMob, handleCloseMobMenu }: NavListProps) => (
  <nav className={`flex items-center ${isMob ? "flex-col" : "flex-row"}`}>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `${headerLink} ${isActive && "!underline"} ${isMob && "py-2.5"}`
      }
      onClick={handleCloseMobMenu}
    >
      Home
    </NavLink>
    {!isMob && <CategoryList />}
    <NavLink
      to="/about"
      className={({ isActive }) =>
        `${headerLink} ${isActive && "!underline"} ${isMob && "py-2.5"}`
      }
      onClick={handleCloseMobMenu}
    >
      About
    </NavLink>
    <NavLink
      to="/contacts"
      className={({ isActive }) =>
        `${headerLink} ${isActive && "!underline"} ${isMob && "py-2.5"}`
      }
      onClick={handleCloseMobMenu}
    >
      Contacts
    </NavLink>
  </nav>
);
