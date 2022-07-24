import { useContext } from "react";
import { AuthContext, IAuthContext } from "../context/auth.context";

export default function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be within AuthProvider");
  }
  return context;
}
