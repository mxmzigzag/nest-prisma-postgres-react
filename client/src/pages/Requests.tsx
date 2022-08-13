import React, { useState } from "react";

import { RequestStatus } from "../types/request.types";

import { useGetAllRequestsQuery } from "../store/api/request.api";

import ProfileLayout from "../layouts/profile.layout";
import Loader from "../components/ui/loader";
import Request from "../features/Requests/components/request";
import Button from "../components/ui/button";

export default function Requests() {
  const [limit, setLimit] = useState<number>(5);
  const { data: requestsData = [], isLoading } = useGetAllRequestsQuery({
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

  console.log("requests", requests);

  const handleIncreaseLimit = () => {
    setLimit(limit + 5);
  };

  return (
    <ProfileLayout title="Reguests">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className="requests-list">
            {requests.map((req) => (
              <Request key={req.id} request={req} />
            ))}
          </ul>
          <Button
            className="load-more-btn mx-auto"
            onClick={handleIncreaseLimit}
          >
            More
          </Button>
        </>
      )}
    </ProfileLayout>
  );
}
