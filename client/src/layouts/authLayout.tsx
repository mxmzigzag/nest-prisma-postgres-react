import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="auth-bg">
      <div className="auth-wrapper">
        <div className="auth-container">{children}</div>
      </div>
    </div>
  );
}
