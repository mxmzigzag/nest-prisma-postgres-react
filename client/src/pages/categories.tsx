import React, { useState } from "react";

import { useGetAllCategoriesQuery } from "../store/api/category.api";

import ProfileLayout from "../layouts/profile.layout";
import CategoriesList from "../features/Categories/categoriesList";
import CategoryForm from "../features/Categories/categoryForm";
import Modal from "../components/ui/modal";
import Loader from "../components/ui/loader";

export default function Categories() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: categories = [], isLoading } = useGetAllCategoriesQuery();

  return (
    <ProfileLayout
      title="Categories"
      btnTitle="Add Category"
      btnOnClick={() => setIsOpen(true)}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="categories-wrapper">
          {categories.length ? (
            <CategoriesList categories={categories} />
          ) : (
            <div className="categories-empty-wrapper">
              <p className="categories-empty-text">There is no categories!</p>
            </div>
          )}
        </div>
      )}
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
