import { globalApi } from "./global.api";

import { User } from "../../types/user.types";

export const bannedUserApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["User", "BannedUser", "Post"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllBannedUsers: build.query<User[], void>({
        query: () => {
          const token = localStorage.getItem("token");
          return {
            url: `users/banned`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        providesTags: ["BannedUser"],
      }),
      banUser: build.mutation<User, string>({
        query: (userId) => {
          const token = localStorage.getItem("token");
          return {
            url: `user/${userId}/ban`,
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["User", "BannedUser", "Post"],
      }),
      unbanUser: build.mutation<User, string>({
        query: (userId) => {
          const token = localStorage.getItem("token");
          return {
            url: `user/${userId}/unban`,
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["User", "BannedUser", "Post"],
      }),
    }),
  });

export const {
  useGetAllBannedUsersQuery,
  useBanUserMutation,
  useUnbanUserMutation,
} = bannedUserApi;
