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
    <div
      className={`flex flex-row lg:flex-col items-center justify-center p-2.5 lg:w-[38px] ${
        isPendingStatus &&
        "border-t-[1px] border-t-black lg:border-t-0 lg:border-l-[1px] lg:border-l-black"
      }`}
    >
      {isPendingStatus ? (
        <>
          <AcceptIcon
            className="mr-2.5 lg:mr-0 lg:mb-2.5 cursor-pointer hover:fill-bGreen"
            onClick={handleAcceptRequest}
          />
          <RejectIcon
            className="cursor-pointer hover:fill-bRed"
            onClick={handleRejectRequest}
          />
        </>
      ) : null}
    </div>
  );
}
