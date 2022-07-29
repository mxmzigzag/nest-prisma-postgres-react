import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getIsAuth, getUser } from "../store/slice/user.slice";

export const useAuth = () => {
  const user = useSelector(getUser);
  const isAuth = useSelector(getIsAuth);

  return useMemo(() => ({ user, isAuth }), [user, isAuth]);
};
