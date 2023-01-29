import React, { ChangeEvent } from "react";

type Props = {
  name: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: any;
};

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
      className="input"
    />
  ) : (
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
