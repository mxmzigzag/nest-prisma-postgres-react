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

const headerCellStyles =
  "text-lg py-1 px-2.5 border-r-[1px] border-r-solid border-r-bGrayLight last:border-r-0";

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
    <div className="flex flex-col border-[1px] border-solid border-bGrayLight rounded-lg overflow-hidden mb-2.5">
      <div className="group grid grid-cols-bCategoryGrid border-b-2 border-b-solid border-b-bGray bg-white relative">
        <div className="flex items-center justify-center p-1 border-r-[1px] border-r-solid border-r-bGrayLight">
          <Checkbox
            checked={checkList.length === categories.length}
            onChange={handleCheckAll}
          />
        </div>
        <div className={headerCellStyles}>Name</div>
        <div className={headerCellStyles}>Color</div>
        {checkList.length === categories.length ? (
          <div className="hidden absolute top-1/2 right-2.5 -translate-y-1/2 border-[1px] border-solid border-bGrayLight rounded-lg overflow-hidden group-hover:flex">
            <DeleteIcon
              width={24}
              height={24}
              onClick={() => setConfirmationIsOpen(true)}
              className="py-0.5 px-1 cursor-pointer hover: bg-bGrayLight"
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
        <div
          key={category.id}
          className="group grid grid-cols-bCategoryGrid bg-white relative border-b-[1px] border-b-solid border-b-bGrayLight last:border-b-0"
        >
          <div className="flex items-center justify-center p-1 border-r-[1px] border-r-solid border-r-bGrayLight">
            <Checkbox
              checked={checkList.includes(category.id)}
              onChange={() => handleCheckRow(category.id)}
            />
          </div>
          <div className="text-[20px] py-1 px-2.5 border-r-[1px] border-r-solid border-r-bGrayLight">
            {category.title}
          </div>
          <div className="py-1 px-2.5">
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
      <div className="hidden absolute top-1/2 right-2.5 -translate-y-1/2  border-[1px] border-solid border-bGrayLight rounded-lg overflow-hidden group-hover:flex">
        <PenIcon
          width={24}
          height={24}
          onClick={() => setIsOpen(true)}
          className="py-0.5 px-1 border-r-[1px] border-r-solid border-r-bGrayLight cursor-pointer hover:bg-bGrayLight"
        />
        <CopyIcon
          width={24}
          height={24}
          onClick={handleDuplicate}
          className="py-0.5 px-1 border-r-[1px] border-r-solid border-r-bGrayLight cursor-pointer hover:bg-bGrayLight"
        />
        <DeleteIcon
          width={24}
          height={24}
          onClick={() => setConfirmationIsOpen(true)}
          className="py-0.5 px-1 cursor-pointer hover:bg-bGrayLight"
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
