import React from "react";

import { Props } from "./svg.types";

export default function DeleteIcon({
  width = 24,
  height = 24,
  className = "",
  ...otherProps
}: Props) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      {" "}
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"></path>
    </svg>
  );
}
