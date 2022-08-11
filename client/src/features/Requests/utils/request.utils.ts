import { RequestStatus } from "../../../types/request.types";

export const getStatusColor = (status: RequestStatus) =>
  status === RequestStatus.PENDING
    ? "orange"
    : status === RequestStatus.ACCEPTED
    ? "green"
    : "red";
