import React, { useState } from "react";
import { v4 as createUID } from "uuid";

import { Category } from "../../types/category.types";

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../store/api/category.api";

import Checkbox from "../../components/forms/checkbox";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import CategoryForm from "./categoryForm";
import ColorPill from "../../components/ui/colorPill";
import { errorToast, successToast } from "../../components/ui/toast";

import PenIcon from "../../assets/svg/pen";
import CopyIcon from "../../assets/svg/copy";
import DeleteIcon from "../../assets/svg/delete";

type RowActionsProps = {
  category: Category;
};

export default function CategoriesList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<string[]>([]);
  const { data: categories = [] } = useGetAllCategoriesQuery();

  const handleCheckAll = () => {
    if (checkList.length === categories.length) {
      setCheckList([]);
    } else {
      setCheckList(categories.map((cat) => cat.id));
    }
  };

  const handleCheckRow = (rowId: string) => {
    if (checkList.includes(rowId)) {
      setCheckList((state) => [...state.filter((id) => id !== rowId)]);
    } else {
      setCheckList((state) => [...state, rowId]);
    }
  };

  return (
    <div className="categories-wrapper">
      {categories.length ? (
        <>
          <div className="categories-header">
            <div className="categories-header-check">
              <Checkbox
                checked={checkList.length === categories.length}
                onChange={handleCheckAll}
              />
            </div>
            <div className="categories-header-cell">Name</div>
            <div className="categories-header-cell">Color</div>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="categories-row">
              <div className="categories-row-check">
                <Checkbox
                  checked={checkList.includes(category.id)}
                  onChange={() => handleCheckRow(category.id)}
                />
              </div>
              <div className="categories-row-cell">{category.title}</div>
              <div className="categories-row-color">
                <ColorPill color={category.color} />
              </div>
              <RowActions category={category} />
            </div>
          ))}
        </>
      ) : (
        <div className="categories-empty-wrapper">
          <p className="categories-empty-text">There is no categories!</p>
          <Button onClick={() => setIsOpen(true)} className="category-form-btn">
            Add the first one!
          </Button>
          <Modal
            title="Create Category"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            customWrapperClass="category-form-wrapper"
          >
            <CategoryForm setIsOpen={setIsOpen} />
          </Modal>
        </div>
      )}
    </div>
  );
}

const RowActions = ({ category }: RowActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDuplicate = async () => {
    try {
      const newCategory = { ...category, id: createUID() };
      await createCategory(newCategory);
      successToast(`Category ${category.title} duplicated`);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id);
      successToast("Category removed");
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <>
      <div className="categories-row-actions">
        <PenIcon width={24} height={24} onClick={() => setIsOpen(true)} />
        <CopyIcon width={24} height={24} onClick={handleDuplicate} />
        <DeleteIcon width={24} height={24} onClick={handleDelete} />
      </div>
      <Modal
        title="Edit Category"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        customWrapperClass="category-form-wrapper"
      >
        <CategoryForm setIsOpen={setIsOpen} category={category} />
      </Modal>
    </>
  );
};
