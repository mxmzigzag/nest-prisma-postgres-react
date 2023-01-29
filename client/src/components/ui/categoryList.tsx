import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Category } from "../../types/category.types";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useGetAllCategoriesQuery } from "../../store/api/category.api";
import { getBlogCategory, setCategory } from "../../store/slice/blog.slice";

export default function CategoryList() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const category = useSelector(getBlogCategory);

  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery({});

  const handleSelect = (ctg: Category) => {
    dispatch(setCategory(ctg.id === category?.id ? null : ctg));
    if (pathname !== "/") navigate("/");
  };

  useOutsideClick(listRef, () => setIsOpen(false));

  return (
    <div className="header-category-wrapper" ref={listRef}>
      <button
        className="header-category-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        Category
      </button>
      {!isLoading && categoriesData && isOpen ? (
        <div className="header-category-list">
          {categoriesData.page.length ? (
            categoriesData.page.map((ctg) => (
              <button
                key={ctg.id}
                className={`header-category-list-item ${
                  ctg.id === category?.id ? "active" : ""
                }`}
                onClick={() => handleSelect(ctg)}
              >
                {ctg.title}
              </button>
            ))
          ) : (
            <p className="header-category-list-item no-hover">No categories</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
