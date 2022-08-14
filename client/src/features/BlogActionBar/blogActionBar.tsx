import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "../../hooks/useDebounce";

import {
  getDateSort,
  getPopularSort,
  setDateSort,
  setPopularSort,
  setSearchQuery,
} from "../../store/slice/blog.slice";
import { changeSortMethod } from "./utils/sort.utils";
import CategoryList from "../../components/ui/categoryList";
import TagList from "../../components/ui/tagList";

import SearchIcon from "../../assets/svg/search";
import ChevronDownIcon from "../../assets/svg/chevronDown";

export default function BlogActionBar() {
  const dispatch = useDispatch();
  const popularSort = useSelector(getPopularSort);
  const dateSort = useSelector(getDateSort);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const debouncedSearchInput = useDebounce<string>(searchInputValue, 100);

  const handleClickOnSearch = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchInput));
  }, [debouncedSearchInput]);

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
