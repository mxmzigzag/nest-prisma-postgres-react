import React from "react";
import { useNavigate } from "react-router-dom";

import ErrorIcon from "../assets/svg/error";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1200px] min-h-[calc(100vh - 67px)] mx-auto py-4 px-6">
      <ErrorIcon width={300} height={290} />
      <h1 className="mt-10 mb-5">Whoops! Smth went wrong!</h1>
      <p>
        Try to{" "}
        <button
          onClick={() => navigate(-1)}
          className="bg-none border-0 outline-0 text-bBrownHover underline cursor-pointer"
        >
          go back
        </button>{" "}
        while we are figuring out whats happened!
      </p>
    </div>
  );
}
