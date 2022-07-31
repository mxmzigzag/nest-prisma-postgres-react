import React from "react";
import dayjs from "dayjs";

import { Request } from "../types/request.types";

import { useGetAllRequestsQuery } from "../store/api/request.api";

import LoaderIcon from "../assets/svg/loader";
import ProfileLayout from "../layouts/profile.layout";

import AcceptIcon from "../assets/svg/accept";
import RejectIcon from "../assets/svg/reject";

export default function Requests() {
  const { data: requests = [], isLoading } = useGetAllRequestsQuery();

  return (
    <ProfileLayout title="Reguests">
      {isLoading ? (
        <LoaderIcon />
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

const RequestItem = ({ request }: { request: Request }) => (
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
          Update role of {request.user.name} &quot;{request.user.username}&quot;{" "}
          {request.user.surname} to Creator
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
    <div className="requests-actions">
      {request.status === "PENDING" ? (
        <>
          <AcceptIcon className="requests-actions-accept" />
          <RejectIcon className="requests-actions-reject" />
        </>
      ) : null}
    </div>
  </li>
);
