import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useGetAllTagsQuery } from "../../store/api/tag.api";
import { getBlogTags, setTags } from "../../store/slice/blog.slice";

import SearchIcon from "../../assets/svg/search";

const TAGS_LIMIT = 15;

export default function TagList() {
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const dispatch = useDispatch();
  const tags = useSelector(getBlogTags);

  const { data: tagsData = [], isLoading } = useGetAllTagsQuery();
  const filteredTags = tagsData.filter((tag) =>
    tag.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSelect = (tagId: string) => {
    const selectedTags = tags.includes(tagId)
      ? tags.filter((t) => t !== tagId)
      : [...tags, tagId];

    dispatch(setTags(selectedTags));
  };

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useOutsideClick(listRef, () => setIsOpen(false));

  return (
    <div className="relative w-full" ref={listRef}>
      <button
        className="font-serif color-black text-medium px-4 text-xl bg-none border-0 w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Tags
      </button>
      {!isLoading && tagsData && isOpen ? (
        <div className="absolute top-[130%] left-0 right-0 max-h-[110px] flex flex-col bg-white rounded z-10 overflow-auto shadow-bShadow">
          <div className="flex items-center sticky top-0 left-0 right-0">
            <SearchIcon
              width={18}
              height={18}
              className="absolute top-1/2 right-1 -translate-y-1/2"
            />
            <input
              value={searchInput}
              onChange={handleChangeSearchInput}
              className="border-0 border-b-[1px] border-b-solid border-b-black py-1 pr-5 pl-1 outline-0 w-full"
            />
          </div>
          {filteredTags.slice(0, TAGS_LIMIT).map((tag) => (
            <button
              key={tag.id}
              className={`text-base py-1 px-2 border-0 bg-none cursor-pointer hover:bg-bGrayLight ${
                tags.includes(tag.id) ? "bg-bBrown" : ""
              }`}
              onClick={() => handleSelect(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
