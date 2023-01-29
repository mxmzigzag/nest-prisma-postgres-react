import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Mutation } from "../types/common.types";
import { LoginData, User } from "../types/user.types";
import { UserTokenResponse } from "../types/auth.types";
import {
  useCheckTokenMutation,
  useLogoutMutation,
} from "../store/api/auth.api";

export interface IAuthContext {
  isAuth: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registration: (
    registerUser: Mutation<FormData, UserTokenResponse>,
    data: FormData
  ) => Promise<UserTokenResponse>;
  login: (
    loginUser: Mutation<LoginData, UserTokenResponse>,
    data: LoginData
  ) => Promise<UserTokenResponse>;
  logout: () => Promise<string>;
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

  const [logoutUser] = useLogoutMutation();
  const [checkToken] = useCheckTokenMutation();

  const registration = async (
    registerUser: Mutation<FormData, UserTokenResponse>,
    data: FormData
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

  const logout = async (): Promise<string> => {
    return lgtUsr();
  };

  const checkTokenValidity = useCallback(async () => {
    const response = await checkToken();
    if ("error" in response && response.error) {
      lgtUsr();
    }
    if ("data" in response && response.data) {
      localStorage.setItem("token", response.data.token);
    }
  }, []);

  useEffect(() => {
    if (isAuth) checkTokenValidity();
  }, [isAuth, checkTokenValidity]);

  const lgtUsr = async () => {
    try {
      const data = await logoutUser().unwrap();
      setUser(null);
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
