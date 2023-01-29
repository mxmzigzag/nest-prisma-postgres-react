import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  username: yup.string().required("Username is required"),
  image: yup.mixed().required("File is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(3, "Minimum 3 characters")
    .required("Password is required"),
});
