import React, { useState } from "react";

import { useGetAllCategoriesQuery } from "../../store/api/category.api";

import Checkbox from "../../components/forms/checkbox";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import CategoryForm from "./categoryForm";
import ColorPill from "../../components/ui/colorPill";
import PenIcon from "../../assets/svg/pen";
import CopyIcon from "../../assets/svg/copy";
import DeleteIcon from "../../assets/svg/delete";
import { Category } from "../../types/category.types";

type RowActionsProps = {
  category: Category;
};

export default function CategoriesList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<string[]>([]);
  const { data: categories = [] } = useGetAllCategoriesQuery();

  const handleCheckAll = () => {
    setCheckList(categories.map((cat) => cat.id));
  };

  const handleCheckRow = (rowId: string) => {
    setCheckList((state) => [...state, rowId]);
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
              <div className="categories-row-cell">
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

  const handleDuplicate = () => {
    console.log("dup");
  };

  const handleDelete = () => {
    console.log("del");
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
