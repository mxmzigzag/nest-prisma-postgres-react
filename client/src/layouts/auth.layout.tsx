import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="bg-bAuthBg">
      <div className="w-full min-h-screen max-w-[500px] mx-auto py-5 px-4">
        <div className="flex flex-col items-center p-5 rounded-lg bg-white shadow-bShadow">
          {children}
        </div>
      </div>
    </div>
  );
}
