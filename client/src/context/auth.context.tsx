import React, { createContext, useMemo, useState } from "react";
import Cookies from "js-cookie";

import { LoginFormData } from "../features/AuthForms/loginForm";
import { RegistrationFormData } from "../features/AuthForms/registrationForm";
import { useFetch } from "../hooks/useFetch";
import { TokenResponse } from "../data/common.types";
import { Profile } from "../pages/profile";

export interface IAuthContext {
  isAuth: boolean;
  user: Profile | null;
  registration: (data: RegistrationFormData) => Promise<string>;
  login: (data: LoginFormData) => Promise<string>;
  logout: () => void;
}

type Props = {
  children: JSX.Element;
};

type LoginResponse = {
  user: Profile;
  token: string;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: Props) {
  const { request } = useFetch();

  const token = Cookies.get("token");
  const [isAuth, setIsAuth] = useState(token ? true : false);
  const [user, setUser] = useState<Profile | null>(null);

  const registration = async (data: RegistrationFormData): Promise<string> => {
    try {
      const response = await request<TokenResponse>(
        "registration",
        "POST",
        data
      );
      setIsAuth(true);
      return response.token;
    } catch (err: any) {
      throw err;
    }
  };

  const login = async (data: LoginFormData): Promise<string> => {
    try {
      const response = await request<LoginResponse>("login", "POST", data);
      setIsAuth(true);
      setUser(response.user);
      return response.token;
    } catch (err: any) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await request<string>("logout", "POST", {});
      setIsAuth(false);
    } catch (err: any) {
      throw err;
    }
  };

  const contextValue = useMemo(
    () => ({ isAuth, user, registration, login, logout }),
    [isAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
