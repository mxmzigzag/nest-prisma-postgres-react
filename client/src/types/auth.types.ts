import { User } from "./user.types";

export type UserTokenResponse = {
  user: User;
  token: string;
};
