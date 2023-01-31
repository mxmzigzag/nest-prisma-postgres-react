import React from "react";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function PageLayout({ title, children }: Props) {
  return (
    <div className="flex flex-col w-full max-w-[1200px] min-h[calc(100vh - 67px)] mx-auto p-6">
      <h1 className="text-3xl text-center mb-6">{title}</h1>
      {children}
    </div>
  );
}
