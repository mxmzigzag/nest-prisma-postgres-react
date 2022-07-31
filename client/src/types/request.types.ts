export type Request = {
  id: string;
  type: "UPDATE_TO_CREATOR" | "UPDATE_TO_ADMIN";
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRequest = {
  type: "UPDATE_TO_CREATOR" | "UPDATE_TO_ADMIN";
  userId: number;
};
