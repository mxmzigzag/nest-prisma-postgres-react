import { globalApi } from "./global.api";

import { CreateRequest, Request } from "../../types/request.types";
import { Limit } from "../../types/common.types";

export const requestApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["Request", "User", "BannedUser", "Post"] })
  .injectEndpoints({
    endpoints: (build) => ({
      createRequest: build.mutation<Request, CreateRequest>({
        query: (requestData) => {
          const token = localStorage.getItem("token");
          return {
            url: `request`,
            method: "POST",
            body: requestData,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["Request"],
      }),
      getAllRequests: build.query<Request[], Limit>({
        query: ({ limit }) => {
          const token = localStorage.getItem("token");
          return {
            url: `requests?limit=${limit}`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        providesTags: ["Request"],
      }),
      getNumberOfUnanswered: build.query<number, void>({
        query: () => {
          const token = localStorage.getItem("token");
          return {
            url: `requests/unansweredNum`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        providesTags: ["Request"],
      }),
      getRequestIsSentByUser: build.query<boolean, CreateRequest>({
        query: ({ userId, type }) => {
          const token = localStorage.getItem("token");
          return {
            url: `requestIsSent?userId=${userId}&type=${type}`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        providesTags: ["Request"],
      }),
      acceptRequest: build.mutation<Request, string>({
        query: (reqId) => {
          const token = localStorage.getItem("token");
          return {
            url: `request/${reqId}/accept`,
            method: "POST",
            body: reqId,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["Request", "User", "BannedUser", "Post"],
      }),
      rejectRequest: build.mutation<Request, string>({
        query: (reqId) => {
          const token = localStorage.getItem("token");
          return {
            url: `request/${reqId}/reject`,
            method: "POST",
            body: reqId,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["Request"],
      }),
    }),
  });

export const {
  useCreateRequestMutation,
  useGetAllRequestsQuery,
  useGetNumberOfUnansweredQuery,
  useGetRequestIsSentByUserQuery,
  useAcceptRequestMutation,
  useRejectRequestMutation,
} = requestApi;
