import Cookies from "js-cookie";

export default function useAuth() {
  const token = Cookies.get("token");
  console.log("token", token);

  return token ? true : false;
}
