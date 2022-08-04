import React, { ChangeEvent } from "react";

type Props = {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextareaInput({
  name,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <textarea
      id={name}
      name={name}
      rows={5}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
    />
  );
}
