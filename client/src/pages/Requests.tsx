import React, { useState } from "react";

import { RequestStatus } from "../types/request.types";

import { useGetAllRequestsQuery } from "../store/api/request.api";

import ProfileLayout from "../layouts/profile.layout";
import Loader from "../components/ui/loader";
import Request from "../features/Requests/components/request";
import Button from "../components/ui/button";

export default function Requests() {
  const [limit, setLimit] = useState<number>(5);
  const {
    data: requestsData = [],
    isLoading,
    isFetching,
  } = useGetAllRequestsQuery({
    limit,
  });

  const pendingReqs =
    requestsData
      .filter((req) => req.status === RequestStatus.PENDING)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) || [];

  const otherReqs =
    requestsData
      .filter((req) => req.status !== RequestStatus.PENDING)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) || [];

  const requests = [...pendingReqs, ...otherReqs];

  const handleIncreaseLimit = () => {
    setLimit(limit + 5);
  };

  return (
    <ProfileLayout title="Reguests">
      {isLoading ? (
        <Loader />
      ) : requests.length ? (
        <>
          <ul className="list-none mb-5">
            {requests.map((req) => (
              <Request key={req.id} request={req} />
            ))}
          </ul>
          <Button
            className="text-lg py-1.5 px-2.5 max-w-[150px] rounded-lg border-[1px] border-solid border-bBrown bg-bBrown cursor-pointer mx-auto"
            onClick={handleIncreaseLimit}
            isLoading={isFetching}
          >
            More
          </Button>
        </>
      ) : (
        <p className="text-lg mx-auto mb-2.5">No requests found here!</p>
      )}
    </ProfileLayout>
  );
}
