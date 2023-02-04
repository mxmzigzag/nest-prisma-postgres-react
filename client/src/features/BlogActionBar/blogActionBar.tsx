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
import useWindowSize from "../../hooks/useWindowSize";

const actionBarItemStyles =
  "flex items-center justify-center py-1 px-1 sm:px-2.5 border-r-[1px] border-r-solid border-r-black w-full";
const actionBarItemBtnStyles =
  "flex items-center font-serif color-black text-sm sm:text-xl text-medium px-0 sm:px-4 bg-none border-0 cursor-pointer";
const actionBarSearchStyles =
  "flex items-center py-0 sm:py-0.5 pr-2.5 pl-1 cursor-pointer";

export default function BlogActionBar() {
  const { isMob } = useWindowSize();
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
    <div className="flex items-center justify-between border-[1px]  border-black rounded-full bg-bGrayLight w-full max-w-[700px] mx-auto mb-5">
      {!isOpen && (
        <>
          <div className={actionBarItemStyles}>
            <button
              className={actionBarItemBtnStyles}
              onClick={handlePopularSortClick}
            >
              Popular{" "}
              {popularSort === "desc" ? (
                <ChevronDownIcon />
              ) : popularSort === "asc" ? (
                <ChevronDownIcon className="rotate-180" />
              ) : null}
            </button>
          </div>
          <div className={actionBarItemStyles}>
            <button
              className={actionBarItemBtnStyles}
              onClick={handleDateSortClick}
            >
              New{" "}
              {dateSort === "desc" ? (
                <ChevronDownIcon />
              ) : dateSort === "asc" ? (
                <ChevronDownIcon className="rotate-180" />
              ) : null}
            </button>
          </div>
          <div className={actionBarItemStyles}>
            <CategoryList />
          </div>
          <div className={actionBarItemStyles}>
            <TagList />
          </div>
        </>
      )}
      <div
        className={
          isOpen
            ? `${actionBarSearchStyles} w-full`
            : `${actionBarSearchStyles} justify-center`
        }
      >
        {isOpen && (
          <input
            placeholder="Search by post name"
            value={searchInputValue}
            onChange={handleSearchInputChange}
            className="text-base w-full my-[3px] mx-2.5 pt-[1px] px-1 bg-transparent border-0 border-b-[1px] border-b-solid border-b-black outline-0"
          />
        )}
        <SearchIcon
          width={isMob ? 20 : 26}
          height={isMob ? 20 : 26}
          onClick={handleClickOnSearch}
        />
      </div>
    </div>
  );
}
