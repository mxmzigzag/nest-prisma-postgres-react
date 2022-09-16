import { UserTokenResponse } from "../../types/auth.types";
import { LoginData } from "../../types/user.types";
import { globalApi } from "./global.api";

export const authApi = globalApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserTokenResponse, LoginData>({
      query: (loginData: LoginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
    }),
    registration: build.mutation<UserTokenResponse, FormData>({
      query: (userData) => ({
        url: "registration",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } =
  authApi;
