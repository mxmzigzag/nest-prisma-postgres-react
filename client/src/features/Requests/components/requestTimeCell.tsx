import React from "react";
import dayjs from "dayjs";

type Props = {
  name: string;
  time: Date;
  hideValue?: boolean;
};

export default function RequestTimeCell({
  name,
  time,
  hideValue = false,
}: Props) {
  return (
    <div className="requests-time">
      <span className="requests-head">{name}</span>
      <span className="requests-text">
        {hideValue ? "-- : --" : dayjs(time).format("MMMM DD, YYYY")}
      </span>
    </div>
  );
}
