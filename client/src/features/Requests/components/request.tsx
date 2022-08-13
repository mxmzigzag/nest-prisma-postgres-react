import React from "react";

import {
  Request as RequestModel,
  RequestStatus,
} from "../../../types/request.types";

import RequestTimeCell from "./requestTimeCell";
import RequestActions from "./requestActions";
import RequestBody from "./requestBody";
import RequestStatusCell from "./requestStatus";

type Props = {
  request: RequestModel;
};

export default function Request({ request }: Props) {
  return (
    <li className="requests-item">
      <RequestStatusCell status={request.status} />
      <RequestBody type={request.type} user={request.user} />
      <RequestTimeCell name="Created at:" time={request.createdAt} />
      <RequestTimeCell
        name="Answered at:"
        time={request.updatedAt}
        hideValue={request.status === RequestStatus.PENDING}
      />
      <RequestActions
        reqId={request.id}
        isPendingStatus={request.status === RequestStatus.PENDING}
      />
    </li>
  );
}
