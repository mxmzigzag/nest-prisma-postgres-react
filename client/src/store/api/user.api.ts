import { globalApi } from "./global.api";

import { ProfileFormData, User } from "../../types/user.types";

export const userApi = globalApi.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation<User, ProfileFormData>({
      query: (userData: ProfileFormData) => ({
        url: `user/${userData.id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;
