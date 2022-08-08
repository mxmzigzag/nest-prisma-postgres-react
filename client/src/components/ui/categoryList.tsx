import React, { useState } from "react";

import { useGetAllCategoriesQuery } from "../../store/api/category.api";

export default function CategoryList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery({});

  return (
    <div className="header-category-wrapper">
      <button
        className="header-category-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        Category
      </button>
      {!isLoading && categoriesData && isOpen ? (
        <div className="header-category-list">
          {categoriesData.page.map((category) => (
            <button key={category.id} className="header-category-list-item">
              {category.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
