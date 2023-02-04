import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Category } from "../../types/category.types";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useGetAllCategoriesQuery } from "../../store/api/category.api";
import { getBlogCategory, setCategory } from "../../store/slice/blog.slice";

const listItem =
  "text-xxs sm:text-base py-0.5 sm:py-1 px-2 border-0 bg-none cursor-pointer hover:bg-bGrayLight";

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
    <div className="relative" ref={listRef}>
      <button
        className="font-serif	color-black font-medium px-0 sm:px-4 text-sm sm:text-xl bg-none border-0 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Category
      </button>
      {!isLoading && categoriesData && isOpen ? (
        <div className="absolute top-[130%] left-0 right-0 max-h-[110px] flex flex-col bg-white rounded z-30 overflow-auto shadow-bShadow">
          {categoriesData.page.length ? (
            categoriesData.page.map((ctg) => (
              <button
                key={ctg.id}
                className={`${listItem} ${
                  ctg.id === category?.id ? "bg-bBrown" : ""
                }`}
                onClick={() => handleSelect(ctg)}
              >
                {ctg.title}
              </button>
            ))
          ) : (
            <p className={`${listItem} hover:bg-none`}>No categories</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
