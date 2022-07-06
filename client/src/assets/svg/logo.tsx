import React from "react";
import { Props } from "./svg.types";

export default function Logo({
  width = 2500,
  height = 1868,
  className = "",
  ...otherProps
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 44.4 33.18"
      className={className}
      {...otherProps}
    >
      <path d="M44.4 0v28.8l-22.02 4.38L0 28.8V0z" />
      <path
        d="M33.6 12.12a28.875 28.875 0 0 0 4.98-6.54c.72-1.43-.254-2.405-1.38-1.74-1.083.66-4.633 4.3-5.22 8.52-.754.894-1.61 1.759-2.46 2.16-.768.318-1.062-.254-1.08-1.02 2.184-1.814 5.244-6.267 5.4-7.74.21-1.535-.84-1.198-1.74-.66-2.4 1.412-4.725 5.987-5.22 7.68-.196.53-.306 1.008-.3 1.44-1.78 1.917-2.095 1.229-1.74.12l1.68-3.72-.96-.06s-.622.452-.96.84c-2.438-1.438-4.8 2.95-5.04 3.6-.285.625-1.335 3.025.06 3.48 1.455.445 2.468-.942 3.12-2.04-.015.422.473.91.96 1.08.68.212 1.974-1.16 2.94-2.52.21.444.624.751 1.38.9 1.394.242 2.955-1.232 3.96-2.4.36 1.332 1.902 1.525 3.6 1.5-3.78 1-17.13 5.725-20.64 7.74l2.82 1.68C21.3 21.925 30 17.05 38.7 14.64l-.24-.72c-1.763.335-4.55.756-4.86-1.8z"
        fill="#fff"
      />
      <path
        d="M17.939 17.82c.66-1.482 1.11-3.357-.6-4.56 1.598-.335 3.922-1.948 4.08-3.84.106-1.411-.479-2.447-2.16-3 1.018-.832 1.775-1.006 2.16-.72.555.55 1.38-.05.78-.479-1.106-1.058-2.722-.499-4.2.96a2.801 2.801 0 0 0-.6-.06C14.287 5.837 9.262 7.337 7.14 10.5c-1.365 2.087-1.253 4.525 2.46 4.02.562-.133.487-.695-.06-.66-.503.04-1.178-.522-1.08-1.5.051-.958 1.841-5.195 8.76-5.4-3.021 3.499-8.771 12.228-11.16 16.62 0 0 2.415-.53 3.84-.96.25-.907.585-1.834.96-2.76.478.689 1.336 1.47 2.88 1.38 1.935-.178 3.585-1.978 4.199-3.42z"
        fill="#fff"
      />
      <path d="M31.74 6.54c.623-.627.735.047.42.78-.376.794-1.899 3.277-3.6 4.98.575-2.615 2.632-5.217 3.18-5.76zM37.38 5.04c.596-.129-.909 3.087-3.72 5.88.458-2.325 2.744-5.802 3.72-5.88zM19.74 9.72c-.858 2.29-3.528 3.127-4.98 2.76 1.228-1.991 2.37-3.606 3.06-4.44.256-.361.51-.652.78-.9.968.231 1.831.805 1.14 2.58zM11.34 18.78a46.268 46.268 0 0 1 2.46-4.68c1.002-.579 1.697-.583 2.34-.36.772.272.998 2.073.18 3.6-.798 1.408-3.373 3.631-4.98 1.44zM23.7 12.42c-.413-.283-1.663.855-2.34 2.28-.547 1.113-.248 1.525 0 1.62.203.13 1.027-.545 1.5-1.38.502-.815 1.252-2.128.84-2.52z" />
    </svg>
  );
}
