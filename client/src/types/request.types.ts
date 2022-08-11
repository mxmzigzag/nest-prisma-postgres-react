import { User } from "./user.types";

export enum RequestType {
  UPDATE_TO_CREATOR = "UPDATE_TO_CREATOR",
  UPDATE_TO_ADMIN = "UPDATE_TO_ADMIN",
  UNBAN = "UNBAN",
}

export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type Request = {
  id: string;
  type: RequestType;
  status: RequestStatus;
  userId: string;
  user: Partial<User>;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRequest = {
  type: RequestType;
  userId: string;
};
