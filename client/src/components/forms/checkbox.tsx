import React from "react";

type Props = {
  label?: string;
  checked: boolean;
  onChange: () => void;
};

export default function Checkbox({ label, checked, onChange }: Props) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
