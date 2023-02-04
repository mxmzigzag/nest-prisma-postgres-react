import React from "react";
import dayjs from "dayjs";

type Props = {
  name: string;
  time: Date;
};

export default function RequestTimeCell({ name, time }: Props) {
  return (
    <div className="flex flex-col py-1.5 px-2 lg:py-5 lg:px-4">
      <span className="text-xs lg:text-base text-bGray mb-0.5 lg:mb-4">
        {name}
      </span>
      <span className="text-xs sm:text-lg">
        {time ? dayjs(time).format("MMMM DD, YYYY") : "-- : --"}
      </span>
    </div>
  );
}
