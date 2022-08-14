import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Category } from "../../types/category.types";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useGetAllCategoriesQuery } from "../../store/api/category.api";
import { getBlogCategory, setCategory } from "../../store/slice/blog.slice";

export default function CategoryList() {
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const category = useSelector(getBlogCategory);

  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery({});

  const handleSelect = (ctg: Category) => {
    dispatch(setCategory(ctg.id === category?.id ? null : ctg));
  };

  useOutsideClick(listRef, () => setIsOpen(false));

  return (
    <div className="header-category-wrapper">
      <button
        className="header-category-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        Category
      </button>
      {!isLoading && categoriesData && isOpen ? (
        <div className="header-category-list" ref={listRef}>
          {categoriesData.page.map((ctg) => (
            <button
              key={ctg.id}
              className={`header-category-list-item ${
                ctg.id === category?.id ? "active" : ""
              }`}
              onClick={() => handleSelect(ctg)}
            >
              {ctg.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
