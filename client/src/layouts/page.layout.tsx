import React from "react";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function PageLayout({ title, children }: Props) {
  return (
    <div className="page-wrapper">
      <h1 className="page-title">{title}</h1>
      {children}
    </div>
  );
}
