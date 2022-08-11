import React from "react";

import { RequestStatus } from "../types/request.types";

import { useGetAllRequestsQuery } from "../store/api/request.api";

import ProfileLayout from "../layouts/profile.layout";
import Loader from "../components/ui/loader";
import Request from "../features/Requests/components/request";

export default function Requests() {
  const { data: requestsData = [], isLoading } = useGetAllRequestsQuery();

  const pendingReqs = requestsData
    .filter((req) => req.status === RequestStatus.PENDING)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const otherReqs = requestsData
    .filter((req) => req.status !== RequestStatus.PENDING)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const requests = [...pendingReqs, ...otherReqs];

  return (
    <ProfileLayout title="Reguests">
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="requests-list">
          {requests.map((req) => (
            <Request key={req.id} request={req} />
          ))}
        </ul>
      )}
    </ProfileLayout>
  );
}
