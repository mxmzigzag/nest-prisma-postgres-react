import React from "react";

import { RequestStatus } from "../../../types/request.types";

import { getStatusColor } from "../utils/request.utils";

type Props = {
  status: RequestStatus;
};

export default function RequestStatusCell({ status }: Props) {
  return (
    <div
      className="requests-status"
      style={{ backgroundColor: getStatusColor(status) }}
    >
      <span>{status}</span>
    </div>
  );
}
