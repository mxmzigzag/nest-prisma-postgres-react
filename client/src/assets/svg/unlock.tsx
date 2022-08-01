import React from "react";

import { Props } from "./svg.types";

export default function UnlockIcon({
  width = 24,
  height = 24,
  className = "",
  color = "#000",
  ...otherProps
}: Props) {
  return (
    <svg
      stroke="currentColor"
      fill={color}
      strokeWidth="0"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
    </svg>
  );
}
