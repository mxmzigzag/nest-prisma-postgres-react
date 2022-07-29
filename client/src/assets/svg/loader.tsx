import React from "react";
import { Props } from "./svg.types";

export default function LoaderIcon({
  width = 150,
  height = 150,
  className = "",
  ...otherProps
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={className}
      {...otherProps}
    >
      <path
        d="M20 25L80 25L80 75L20 75Z"
        fill="#f5ab8b"
        stroke="#ee9077"
        strokeWidth="3"
      ></path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill="#f5ab8b"
        stroke="#ee9077"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.5;0.501;1"
          values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.5;0.5001;1"
          values="1;1;0;0"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill="#f5ab8b"
        stroke="#ee9077"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.16938775510204082s"
          keyTimes="0;0.5;0.501;1"
          values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.16938775510204082s"
          keyTimes="0;0.5;0.5001;1"
          values="1;1;0;0"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill="#f5ab8b"
        stroke="#ee9077"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.33673469387755106s"
          keyTimes="0;0.5;0.501;1"
          values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.33673469387755106s"
          keyTimes="0;0.5;0.5001;1"
          values="1;1;0;0"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill="#f5ab8b"
        stroke="#ee9077"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.33673469387755106s"
          keyTimes="0;0.499;0.5;1"
          values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.33673469387755106s"
          keyTimes="0;0.4999;0.5;1"
          values="0;0;1;1"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill="#f5ab8b"
        stroke="#ee9077"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.16938775510204082s"
          keyTimes="0;0.499;0.5;1"
          values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="-0.16938775510204082s"
          keyTimes="0;0.4999;0.5;1"
          values="0;0;1;1"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill="#f5ab8b"
        stroke="#ee9077"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.499;0.5;1"
          values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.4999;0.5;1"
          values="0;0;1;1"
        ></animate>
      </path>
    </svg>
  );
}
