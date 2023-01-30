import React from "react";

import Spinner from "../../assets/svg/spinner";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  spinnerClasses?: string;
  children: JSX.Element | string;
};

export default function Button({
  type = "button",
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
  spinnerClasses = "",
  children,
}: Props) {
  return (
    <button
      type={type}
      className={`bg-bBrown py-3 px-4 border-0 rounded text-lg w-full cursor-pointer transition-all hover:bg-bBrownHover hover:transition-all ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <div className="inline-block relative">
        {children}
        {isLoading && <Spinner className={spinnerClasses} />}
      </div>
    </button>
  );
}
