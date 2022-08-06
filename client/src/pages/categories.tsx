import React, { useState } from "react";

import ProfileLayout from "../layouts/profile.layout";
import CategoriesList from "../features/Categories/categoriesList";
import Modal from "../components/ui/modal";
import CategoryForm from "../features/Categories/categoryForm";

export default function Categories() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ProfileLayout
      title="Categories"
      btnTitle="Add Category"
      btnOnClick={() => setIsOpen(true)}
    >
      <CategoriesList />
      <Modal
        title="Create Category"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        customWrapperClass="category-form-wrapper"
      >
        <CategoryForm setIsOpen={setIsOpen} />
      </Modal>
    </ProfileLayout>
  );
}
