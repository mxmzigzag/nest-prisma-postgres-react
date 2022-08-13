import React from "react";
import dayjs from "dayjs";

type Props = {
  name: string;
  time: Date;
};

export default function RequestTimeCell({ name, time }: Props) {
  return (
    <div className="requests-time">
      <span className="requests-head">{name}</span>
      <span className="requests-text">
        {time ? dayjs(time).format("MMMM DD, YYYY") : "-- : --"}
      </span>
    </div>
  );
}
