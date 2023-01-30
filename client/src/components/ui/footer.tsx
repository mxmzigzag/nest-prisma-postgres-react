import React from "react";
import Logo from "../../assets/svg/logo";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex items-center justify-center bg-bFooter p-7 mt-auto">
      <Logo
        width={100}
        height={70}
        onClick={handleScrollToTop}
        className="mr-4 cursor-pointer transition-all hover:translate-y-1 hover:transition-all"
      />
    </footer>
  );
}
