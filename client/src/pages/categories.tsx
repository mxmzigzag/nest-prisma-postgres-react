import React from "react";
import { v4 as createUID } from "uuid";

import { useCreateCategoryMutation } from "../store/api/category.api";

import ProfileLayout from "../layouts/profile.layout";
import CategoriesList from "../features/Categories/categoriesList";
import { errorToast, successToast } from "../components/ui/toast";

export default function Categories() {
  const [createCategory] = useCreateCategoryMutation();

  const handleAddCategory = async () => {
    try {
      await createCategory({
        id: createUID(),
        title: "New category",
        color: "#000",
      });
      successToast("Category is created");
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <ProfileLayout
      title="Categories"
      btnTitle="Add Category"
      btnOnClick={handleAddCategory}
    >
      <CategoriesList />
    </ProfileLayout>
  );
}
