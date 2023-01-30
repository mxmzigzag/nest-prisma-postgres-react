import React, { ChangeEvent } from "react";
import { baseInputStyles } from "./textInput";

type Props = {
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  register?: any;
};

export default function TextareaInput({
  name,
  placeholder,
  value,
  onChange,
  register,
}: Props) {
  return register ? (
    <textarea
      {...register(name)}
      id={name}
      name={name}
      rows={5}
      placeholder={placeholder}
      className={baseInputStyles}
    />
  ) : (
    <textarea
      id={name}
      name={name}
      rows={5}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={baseInputStyles}
    />
  );
}
