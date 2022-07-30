export type User = {
  id: number;
  name: string;
  surname: string;
  userName: string;
  role: "USER" | "CREATOR" | "ADMIN";
  email: string;
  password: string;
  token?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegistrationData = {
  name: string;
  surname: string;
  userName: string;
  email: string;
  password: string;
};

export type ProfileFormData = {
  id?: number;
  name?: string;
  surname?: string;
  userName?: string;
  email?: string;
};
