import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryList from "../../components/ui/categoryList";

import {
  getDateSort,
  getPopularSort,
  setDateSort,
  setPopularSort,
  setSearchQuery,
} from "../../store/slice/blog.slice";
import TagList from "../../components/ui/tagList";

import SearchIcon from "../../assets/svg/search";
import ChevronDownIcon from "../../assets/svg/chevronDown";
import { changeSortMethod } from "./utils/sort.utils";

export default function BlogActionBar() {
  const dispatch = useDispatch();
  const popularSort = useSelector(getPopularSort);
  const dateSort = useSelector(getDateSort);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const handleClickOnSearch = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handlePopularSortClick = () => {
    dispatch(setDateSort(undefined));
    changeSortMethod({
      sortData: popularSort,
      setSortData: setPopularSort,
      dispatch,
    });
  };

  const handleDateSortClick = () => {
    dispatch(setPopularSort(undefined));
    changeSortMethod({
      sortData: dateSort,
      setSortData: setDateSort,
      dispatch,
    });
  };

  return (
    <div className="action-bar-wrapper">
      {!isOpen && (
        <>
          <div className="action-bar-item">
            <button
              className="action-bar-item-btn"
              onClick={handlePopularSortClick}
            >
              Popular{" "}
              {popularSort === "desc" ? (
                <ChevronDownIcon />
              ) : popularSort === "asc" ? (
                <ChevronDownIcon className="reverse" />
              ) : null}
            </button>
          </div>
          <div className="action-bar-item">
            <button
              className="action-bar-item-btn"
              onClick={handleDateSortClick}
            >
              New{" "}
              {dateSort === "desc" ? (
                <ChevronDownIcon />
              ) : dateSort === "asc" ? (
                <ChevronDownIcon className="reverse" />
              ) : null}
            </button>
          </div>
          <div className="action-bar-item">
            <CategoryList />
          </div>
          <div className="action-bar-item">
            <TagList />
          </div>
        </>
      )}
      <div
        className={
          isOpen ? "action-bar-item-search-full" : "action-bar-item-search"
        }
      >
        {isOpen && (
          <input
            placeholder="Search by post name"
            value={searchInputValue}
            onChange={handleSearchInputChange}
            className="action-bar-item-search-input"
          />
        )}
        <SearchIcon width={26} height={26} onClick={handleClickOnSearch} />
      </div>
    </div>
  );
}
