import { globalApi } from "./global.api";

import { ProfileFormData, User } from "../../types/user.types";

export const userApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllUsers: build.query<User[], void>({
        query: () => {
          const token = localStorage.getItem("token");
          return {
            url: `users`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        providesTags: ["User"],
      }),
      updateProfile: build.mutation<User, ProfileFormData>({
        query: (userData: ProfileFormData) => {
          const token = localStorage.getItem("token");
          return {
            url: `user/${userData.id}`,
            method: "PUT",
            body: userData,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["User"],
      }),
    }),
  });

export const { useGetAllUsersQuery, useUpdateProfileMutation } = userApi;
