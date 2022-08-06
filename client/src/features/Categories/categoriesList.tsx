import React, { useState } from "react";
import { v4 as createUID } from "uuid";

import { Category } from "../../types/category.types";

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/api/category.api";

import Checkbox from "../../components/forms/checkbox";
import Modal from "../../components/ui/modal";
import CategoryForm from "./categoryForm";
import ColorPill from "../../components/ui/colorPill";
import { errorToast, successToast } from "../../components/ui/toast";

import PenIcon from "../../assets/svg/pen";
import CopyIcon from "../../assets/svg/copy";
import DeleteIcon from "../../assets/svg/delete";
import Confirmation from "../../components/ui/confirmation";

type Props = {
  categories: Category[];
};

type RowActionsProps = {
  category: Category;
};

export default function CategoriesList({ categories }: Props) {
  const [confirmationIsOpen, setConfirmationIsOpen] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<string[]>([]);

  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();

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

  const handleDeleteAll = () => {
    checkList.forEach(async (id) => {
      await deleteCategory(id);
    });
  };

  return (
    <div className="categories-table">
      <div className="categories-header">
        <div className="categories-header-check">
          <Checkbox
            checked={checkList.length === categories.length}
            onChange={handleCheckAll}
          />
        </div>
        <div className="categories-header-cell">Name</div>
        <div className="categories-header-cell">Color</div>
        {checkList.length === categories.length ? (
          <div className="categories-header-actions">
            <DeleteIcon
              width={24}
              height={24}
              onClick={() => setConfirmationIsOpen(true)}
            />
            <Confirmation
              isOpen={confirmationIsOpen}
              setIsOpen={setConfirmationIsOpen}
              description={`This will delete all categories`}
              okCallback={handleDeleteAll}
              okIsLoading={isLoadingDelete}
            />
          </div>
        ) : null}
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
    </div>
  );
}

const RowActions = ({ category }: RowActionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmationIsOpen, setConfirmationIsOpen] = useState<boolean>(false);

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();

  const handleDuplicate = async () => {
    try {
      const newCategory = {
        ...category,
        id: createUID(),
        title: `${category.title} Copy`,
      };
      await createCategory(newCategory);
      successToast(`Category ${category.title} duplicated`);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id);
      setIsOpen(false);
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
        <DeleteIcon
          width={24}
          height={24}
          onClick={() => setConfirmationIsOpen(true)}
        />
        <Confirmation
          isOpen={confirmationIsOpen}
          setIsOpen={setConfirmationIsOpen}
          description={`This will delete ${category.title} category`}
          okCallback={handleDelete}
          okIsLoading={isLoadingDelete}
        />
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
