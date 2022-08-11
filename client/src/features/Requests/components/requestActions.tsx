import React from "react";

import {
  useAcceptRequestMutation,
  useRejectRequestMutation,
} from "../../../store/api/request.api";

import { errorToast, successToast } from "../../../components/ui/toast";

import AcceptIcon from "../../../assets/svg/accept";
import RejectIcon from "../../../assets/svg/reject";

type Props = {
  reqId: string;
  isPendingStatus: boolean;
};

export default function RequestActions({ reqId, isPendingStatus }: Props) {
  const [acceptRequest] = useAcceptRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();

  const handleAcceptRequest = async () => {
    try {
      const data = await acceptRequest(reqId);
      // @ts-ignore
      if (data.error) {
        // @ts-ignore
        errorToast(data.error.data.message);
      } else {
        successToast("Request accepted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectRequest = async () => {
    try {
      const data = await rejectRequest(reqId);
      if (data) {
        successToast("Request rejected!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`requests-actions ${isPendingStatus && "border-l"}`}>
      {isPendingStatus ? (
        <>
          <AcceptIcon
            className="requests-actions-accept"
            onClick={handleAcceptRequest}
          />
          <RejectIcon
            className="requests-actions-reject"
            onClick={handleRejectRequest}
          />
        </>
      ) : null}
    </div>
  );
}
