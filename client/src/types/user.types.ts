export enum Role {
  USER = "USER",
  CREATOR = "CREATOR",
  ADMIN = "ADMIN",
}

export type User = {
  id: string;
  name: string;
  surname: string;
  username: string;
  role: Role;
  avatar: string;
  email: string;
  password: string;
  banned?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegistrationData = {
  name: string;
  surname: string;
  username: string;
  image: any;
  email: string;
  password: string;
};

export type ProfileFormData = {
  id?: string;
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
  avatar?: string;
};

export type BannedUser = {
  id: string;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
