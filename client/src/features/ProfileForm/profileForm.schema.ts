import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  username: yup.string().required("Username is required"),
  image: yup.string(),
  email: yup.string().email().required("Email is required"),
});
