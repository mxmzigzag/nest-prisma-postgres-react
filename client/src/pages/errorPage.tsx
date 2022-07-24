import React from "react";
import { useNavigate } from "react-router-dom";

import ErrorIcon from "../assets/svg/error";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page-wrapper">
      <ErrorIcon width={300} height={290} />
      <h1 className="error-title">Whoops! Smth went wrong!</h1>
      <p>
        Try to{" "}
        <button onClick={() => navigate(-1)} className="link-button">
          go back
        </button>{" "}
        while we are figuring out whats happened!
      </p>
    </div>
  );
}
