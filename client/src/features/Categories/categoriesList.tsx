import React, { useState } from "react";

import { useGetAllCategoriesQuery } from "../../store/api/category.api";

import Checkbox from "../../components/forms/checkbox";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import CategoryForm from "./categoryForm";

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
              <div className="categories-row-cell">{category.color}</div>
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
            <CategoryForm />
          </Modal>
        </div>
      )}
    </div>
  );
}
