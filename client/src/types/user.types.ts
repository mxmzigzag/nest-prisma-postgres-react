export type User = {
  id: number;
  name: string;
  surname: string;
  username: string;
  role: "USER" | "CREATOR" | "ADMIN";
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
  email: string;
  password: string;
};

export type ProfileFormData = {
  id?: number;
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
};
