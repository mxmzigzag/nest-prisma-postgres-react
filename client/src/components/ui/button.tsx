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
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <div className="btn-content">
        {children}
        {isLoading && <Spinner className={spinnerClasses} />}
      </div>
    </button>
  );
}
