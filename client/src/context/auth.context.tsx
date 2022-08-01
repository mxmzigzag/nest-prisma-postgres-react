import React, { createContext, useMemo, useState } from "react";

import { Mutation } from "../types/common.types";
import { LoginData, RegistrationData, User } from "../types/user.types";
import { UserTokenResponse } from "../types/auth.types";

export interface IAuthContext {
  isAuth: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registration: (
    registerUser: Mutation<RegistrationData, UserTokenResponse>,
    data: RegistrationData
  ) => Promise<UserTokenResponse>;
  login: (
    loginUser: Mutation<LoginData, UserTokenResponse>,
    data: LoginData
  ) => Promise<UserTokenResponse>;
  logout: (logoutUser: Mutation<void, string>) => Promise<string>;
}

type Props = {
  children: JSX.Element;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: Props) {
  const userLocalStorage = localStorage.getItem("user");
  const userLS = userLocalStorage ? JSON.parse(userLocalStorage) : null;

  const [isAuth, setIsAuth] = useState<boolean>(Boolean(userLS));
  const [user, setUser] = useState<User | null>(userLS);

  const registration = async (
    registerUser: Mutation<RegistrationData, UserTokenResponse>,
    data: RegistrationData
  ): Promise<UserTokenResponse> => {
    try {
      const { user, token } = await registerUser(data).unwrap();
      if (user) {
        setUser(user);
        setIsAuth(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
      }
      return { user, token };
    } catch (err: any) {
      throw err;
    }
  };

  const login = async (
    loginUser: Mutation<LoginData, UserTokenResponse>,
    data: LoginData
  ): Promise<UserTokenResponse> => {
    try {
      const { user, token } = await loginUser(data).unwrap();
      if (user) {
        setUser(user);
        setIsAuth(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      }
      return { user, token };
    } catch (err: any) {
      throw err;
    }
  };

  const logout = async (
    logoutUser: Mutation<void, string>
  ): Promise<string> => {
    try {
      const data = await logoutUser().unwrap();
      setIsAuth(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return data;
    } catch (err: any) {
      throw err;
    }
  };

  const contextValue = useMemo(
    () => ({ isAuth, user, setUser, registration, login, logout }),
    [isAuth, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
