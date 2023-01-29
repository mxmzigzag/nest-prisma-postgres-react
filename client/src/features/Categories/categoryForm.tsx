import React from "react";
import { v4 as createUID } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./categoryForm.schema";
import { Category } from "../../types/category.types";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../store/api/category.api";

import InputGroup from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";
import { errorToast, successToast } from "../../components/ui/toast";

type Props = {
  category?: Category;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoryForm({
  category = {
    id: createUID(),
    title: "",
    color: "#000",
  },
  setIsOpen,
}: Props) {
  const [createCategory, { isLoading: isLoadingCreation }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdation }] =
    useUpdateCategoryMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { ...category },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: Category) => {
    try {
      if (category.title) {
        await updateCategory(formData);
        successToast(`Category ${formData.title} is updated!`);
      } else {
        await createCategory(formData);
        successToast(`Category ${formData.title} is created!`);
      }
      setIsOpen(false);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="category-form-content">
        <InputGroup
          label="Title"
          name="title"
          placeholder="Title"
          register={register}
          error={errors.title?.message}
          className="category-form-input"
        />
        <InputGroup
          label="Color"
          name="color"
          placeholder="Color"
          register={register}
          error={errors.color?.message}
          className="category-form-input"
        />
      </div>
      <Button
        type="submit"
        className="category-form-btn"
        isLoading={isLoadingCreation || isLoadingUpdation}
      >
        {category.title ? "Update" : "Save"}
      </Button>
    </form>
  );
}
