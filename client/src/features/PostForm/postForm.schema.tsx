import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  body: yup.string().required("Body text is required"),
  image: yup.mixed().required("File is required"),
  authorId: yup.string().required("Missing author ID"),
  categoryId: yup.string().required("Choose a category"),
  tags: yup.array().of(
    yup.object({
      id: yup.string(),
      name: yup.string(),
    })
  ),
});
