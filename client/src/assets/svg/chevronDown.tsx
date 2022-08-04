import React from "react";

import { Props } from "./svg.types";

export default function ChevronDownIcon({
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
      <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
    </svg>
  );
}
