import React from "react";

type Props = {
  color: string;
};

export default function ColorPill({ color }: Props) {
  return (
    <div className="flex items-center">
      <div
        className="w-[15px] h-[15px] rounded mr-1 border-[1px] border-solid border-bGrayLight"
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-lg">{color}</span>
    </div>
  );
}
