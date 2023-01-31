import React from "react";
import dayjs from "dayjs";

type Props = {
  name: string;
  time: Date;
};

export default function RequestTimeCell({ name, time }: Props) {
  return (
    <div className="flex flex-col py-5 px-4">
      <span className="text-bGray mb-4">{name}</span>
      <span className="text-lg">
        {time ? dayjs(time).format("MMMM DD, YYYY") : "-- : --"}
      </span>
    </div>
  );
}
