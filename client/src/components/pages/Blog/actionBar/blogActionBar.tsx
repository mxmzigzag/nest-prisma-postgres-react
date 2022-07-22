import React, { ChangeEvent, useState } from "react";
import SearchIcon from "../../../../assets/svg/search";

import "./blogActionBar.scss";

export default function BlogActionBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const handleClickOnSearch = () => {
    if (isOpen) {
      console.log(searchInputValue);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <div className="action-bar-wrapper">
      {!isOpen && (
        <>
          <div className="action-bar-item">Popular</div>
          <div className="action-bar-item">New</div>
          <div className="action-bar-item">Old</div>
        </>
      )}
      <div
        className={
          isOpen ? "action-bar-item-search-full" : "action-bar-item-search"
        }
      >
        {isOpen && (
          <input
            placeholder="search"
            value={searchInputValue}
            onChange={handleSearchInputChange}
            className="action-bar-item-search-input"
          />
        )}
        <SearchIcon width={22} height={22} onClick={handleClickOnSearch} />
      </div>
    </div>
  );
}
