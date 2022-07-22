import React from "react";

import "./authLayout.scss";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">{children}</div>
    </div>
  );
}
