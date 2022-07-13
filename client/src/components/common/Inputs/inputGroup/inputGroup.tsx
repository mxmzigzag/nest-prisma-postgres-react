import React, { ChangeEvent } from "react";

import Input from "../text/textInput";

import "./inputGroup.css";

type Props = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function InputGroup({
  label,
  name,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className="input-group">
      <label htmlFor="email" className="label">
        {label}
      </label>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
