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
    <form
      className="flex flex-col bg-white rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center p-2.5">
        <InputGroup
          label="Title"
          name="title"
          placeholder="Title"
          register={register}
          error={errors.title?.message}
          className="py-0 px-1"
        />
        <InputGroup
          label="Color"
          name="color"
          placeholder="Color"
          register={register}
          error={errors.color?.message}
          className="py-0 px-1"
        />
      </div>
      <Button
        type="submit"
        className="max-w-[200px] mx-auto mb-2.5"
        isLoading={isLoadingCreation || isLoadingUpdation}
      >
        {category.title ? "Update" : "Save"}
      </Button>
    </form>
  );
}
