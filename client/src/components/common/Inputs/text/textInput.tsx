import React, { ChangeEvent } from "react";

import "./textInput.css";

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
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
    />
  );
}
