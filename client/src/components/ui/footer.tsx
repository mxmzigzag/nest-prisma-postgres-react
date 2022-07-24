import React from "react";
import Logo from "../../assets/svg/logo";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <Logo
        width={100}
        height={70}
        onClick={handleScrollToTop}
        className="footer-logo"
      />
    </footer>
  );
}
