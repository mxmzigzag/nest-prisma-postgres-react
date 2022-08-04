import React, { ChangeEvent } from "react";

type Props = {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  name,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
    />
  );
}
