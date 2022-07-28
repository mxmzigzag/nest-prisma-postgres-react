import React, { ChangeEvent } from "react";

import Input from "./textInput";

type Props = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
};

export default function InputGroup({
  label,
  name,
  placeholder,
  value,
  error,
  onChange,
  fullWidth = true,
}: Props) {
  return (
    <div className={`input-group ${!fullWidth && "half"}`}>
      <label htmlFor="email" className="label">
        {label}
      </label>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}
