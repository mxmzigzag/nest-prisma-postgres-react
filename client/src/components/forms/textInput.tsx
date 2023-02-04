import React, { ChangeEvent } from "react";

type Props = {
  name: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: any;
};

export const baseInputStyles =
  "text-lg border-1 border-bInputBorder rounded-lg outline-0 py-1 px-4";

export default function TextInput({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  register,
}: Props) {
  return register ? (
    <input
      {...register(name)}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className={baseInputStyles}
    />
  ) : (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={baseInputStyles}
    />
  );
}
