import { globalApi } from "./global.api";

import { User } from "../../types/user.types";

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
      updateProfile: build.mutation<User, { data: FormData; userId: string }>({
        query: ({ data, userId }) => {
          const token = localStorage.getItem("token");
          return {
            url: `user/${userId}`,
            method: "PUT",
            body: data,
            headers: { Authorization: `Bearer ${token}` },
          };
        },
        invalidatesTags: ["User"],
      }),
    }),
  });

export const { useGetAllUsersQuery, useUpdateProfileMutation } = userApi;
