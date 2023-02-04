import React from "react";

import { RequestStatus } from "../../../types/request.types";

import { getStatusColor } from "../utils/request.utils";

type Props = {
  status: RequestStatus;
};

export default function RequestStatusCell({ status }: Props) {
  return (
    <div
      className="flex items-center justify-center lg:w-[40px]"
      style={{ backgroundColor: getStatusColor(status) }}
    >
      <span className="text-lg text-white tracking-[1px] lg:-rotate-90">
        {status}
      </span>
    </div>
  );
}
