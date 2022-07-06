import React from "react";
import ErrorIcon from "../../assets/svg/error";

import "./errorPage.css";

export default function ErrorPage() {
  return (
    <div className="errorPageWrapper">
      <ErrorIcon width={300} height={290} />
      <h1 className="errorTitle">Whoops! Smth went wrong!</h1>
      <p>
        Try to <a>go back</a> while we are figuring out whats happened!
      </p>
    </div>
  );
}
