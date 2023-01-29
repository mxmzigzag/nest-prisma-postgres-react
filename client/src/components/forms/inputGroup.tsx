import React, { ChangeEvent } from "react";

import Input from "./textInput";
import TextareaInput from "./textareaInput";
import { ErrorText } from "./errorText";

type Props = {
  label: string;
  name: string;
  type?: "text" | "textarea" | "password";
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  fullWidth?: boolean;
  register?: any;
};

export default function InputGroup({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  className,
  fullWidth = true,
  register,
}: Props) {
  return (
    <div className={`input-group ${!fullWidth ? "half" : ""} ${className}`}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      {type === "text" || type === "password" ? (
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          register={register}
        />
      ) : (
        <TextareaInput
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          register={register}
        />
      )}
      {error && <ErrorText text={error} />}
    </div>
  );
}
