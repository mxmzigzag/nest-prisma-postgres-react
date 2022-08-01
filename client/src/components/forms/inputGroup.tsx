import React, { ChangeEvent } from "react";
import TextareaInput from "./textareaInput";

import Input from "./textInput";

type Props = {
  label: string;
  name: string;
  type?: "text" | "textarea";
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fullWidth?: boolean;
};

export default function InputGroup({
  label,
  name,
  type = "text",
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
      {type === "text" ? (
        <Input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <TextareaInput
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}
