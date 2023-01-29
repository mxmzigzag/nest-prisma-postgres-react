import * as yup from "yup";

export const schema = yup.object({
  id: yup.string(),
  title: yup.string().required("Title is required"),
  color: yup.string().required("Color is required"),
});
