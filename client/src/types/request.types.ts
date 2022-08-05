import { User } from "./user.types";

export type Request = {
  id: string;
  type: "UPDATE_TO_CREATOR" | "UPDATE_TO_ADMIN";
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  userId: string;
  user: Partial<User>;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRequest = {
  type: "UPDATE_TO_CREATOR" | "UPDATE_TO_ADMIN";
  userId: string;
};
