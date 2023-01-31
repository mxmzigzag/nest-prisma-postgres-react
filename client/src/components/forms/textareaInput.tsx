import React, { ChangeEvent } from "react";
import { baseInputStyles } from "./textInput";

type Props = {
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  register?: any;
  className?: string;
};

export default function TextareaInput({
  name,
  placeholder,
  value,
  onChange,
  register,
  className,
}: Props) {
  return register ? (
    <textarea
      {...register(name)}
      id={name}
      name={name}
      rows={5}
      placeholder={placeholder}
      className={`${baseInputStyles} ${className}`}
    />
  ) : (
    <textarea
      id={name}
      name={name}
      rows={5}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseInputStyles} ${className}`}
    />
  );
}
