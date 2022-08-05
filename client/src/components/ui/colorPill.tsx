import React from "react";

type Props = {
  color: string;
};

export default function ColorPill({ color }: Props) {
  return (
    <div className="color-pill-wrap">
      <div className="color-pill-box" style={{ backgroundColor: color }}></div>
      <span className="color-pill-text">{color}</span>
    </div>
  );
}
