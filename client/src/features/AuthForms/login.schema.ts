import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(3, "Minimum 3 characters")
    .required("Password is required"),
});
