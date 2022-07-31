import { globalApi } from "./global.api";

import { ProfileFormData, User } from "../../types/user.types";

export const userApi = globalApi.injectEndpoints({
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
    }),
    updateProfile: build.mutation<User, ProfileFormData>({
      query: (userData: ProfileFormData) => ({
        url: `user/${userData.id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateProfileMutation } = userApi;
