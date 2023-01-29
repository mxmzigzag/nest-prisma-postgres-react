import React, { ChangeEvent } from "react";

type Props = {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
    />
  );
}
