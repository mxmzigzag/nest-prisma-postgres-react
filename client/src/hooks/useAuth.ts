import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getIsAuth } from "../store/slice/user.slice";

export const useAuth = () => {
  const isAuth = useSelector(getIsAuth);

  return useMemo(() => ({ isAuth }), [isAuth]);
};
