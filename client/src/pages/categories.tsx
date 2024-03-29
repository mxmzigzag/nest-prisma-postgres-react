import React, { useState } from "react";

import { useGetAllCategoriesQuery } from "../store/api/category.api";

import { Pagination } from "../features/Pagination/pagination";
import ProfileLayout from "../layouts/profile.layout";
import CategoriesList from "../features/Categories/categoriesList";
import CategoryForm from "../features/Categories/categoryForm";
import Modal from "../components/ui/modal";
import Loader from "../components/ui/loader";

const CATEGORIES_LIMIT = 10;

export default function Categories() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery({
    limit: CATEGORIES_LIMIT,
    offset: (currentPage - 1) * CATEGORIES_LIMIT,
  });

  return (
    <ProfileLayout
      title="Categories"
      btnTitle="Add Category"
      btnOnClick={() => setIsOpen(true)}
    >
      {isLoading || !categoriesData ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          {categoriesData.totalCount ? (
            <>
              <CategoriesList categories={categoriesData.page} />
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageLimit={CATEGORIES_LIMIT}
                itemCount={categoriesData.totalCount}
                totalPages={categoriesData.totalPages}
              />
            </>
          ) : (
            <div className="flex flex-col items-center w-full max-w-[300px] mx-auto p-5">
              <p className="text-lg">There is no categories!</p>
            </div>
          )}
        </div>
      )}
      <Modal
        title="Create Category"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        customWrapperClass="w-full max-w-[660px] h-[90vh] lg:h-[25vh] overflow-y-auto mx-auto bg-white rounded-lg"
      >
        <CategoryForm setIsOpen={setIsOpen} />
      </Modal>
    </ProfileLayout>
  );
}
