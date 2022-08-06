import React from "react";
import dayjs from "dayjs";

import { Request } from "../types/request.types";

import {
  useAcceptRequestMutation,
  useGetAllRequestsQuery,
  useRejectRequestMutation,
} from "../store/api/request.api";

import { successToast } from "../components/ui/toast";
import ProfileLayout from "../layouts/profile.layout";
import Loader from "../components/ui/loader";

import AcceptIcon from "../assets/svg/accept";
import RejectIcon from "../assets/svg/reject";

type RequestItem = {
  request: Request;
};

export default function Requests() {
  const { data: requestsData = [], isLoading } = useGetAllRequestsQuery();

  const pendingReqs = requestsData
    .filter((req) => req.status === "PENDING")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const otherReqs = requestsData
    .filter((req) => req.status !== "PENDING")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const requests = [...pendingReqs, ...otherReqs];

  return (
    <ProfileLayout title="Reguests">
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="requests-list">
          {requests.map((req) => (
            <RequestItem key={req.id} request={req} />
          ))}
        </ul>
      )}
    </ProfileLayout>
  );
}

const RequestItem = ({ request }: RequestItem) => {
  const [acceptRequest] = useAcceptRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();

  const handleAcceptRequest = async () => {
    try {
      const data = await acceptRequest(request.id);
      if (data) {
        successToast("Request accepted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectRequest = async () => {
    try {
      const data = await rejectRequest(request.id);
      if (data) {
        successToast("Request rejected!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="requests-item">
      <div
        className="requests-status"
        style={{
          backgroundColor:
            request.status === "PENDING"
              ? "orange"
              : request.status === "ACCEPTED"
              ? "green"
              : "red",
        }}
      >
        <span>{request.status}</span>
      </div>
      <div className="requests-body">
        <span className="requests-head">Request:</span>
        {request.type === "UPDATE_TO_CREATOR" ? (
          <p className="requests-text">
            Update role of {request.user.name} &quot;{request.user.username}
            &quot; {request.user.surname} to Creator
          </p>
        ) : null}
      </div>
      <div className="requests-created">
        <span className="requests-head">Created at:</span>
        <span className="requests-text">
          {dayjs(request.createdAt).format("MMMM DD, YYYY")}
        </span>
      </div>
      <div className="requests-answered">
        <span className="requests-head">Answered at:</span>
        <span className="requests-text">
          {dayjs(request.updatedAt).format("MMMM DD, YYYY")}
        </span>
      </div>
      <div
        className={`requests-actions ${
          request.status === "PENDING" && "border-l"
        }`}
      >
        {request.status === "PENDING" ? (
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
    </li>
  );
};
