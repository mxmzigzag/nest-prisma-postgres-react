import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetAllTagsQuery } from "../../store/api/tag.api";
import { getBlogTags, setTags } from "../../store/slice/blog.slice";

import SearchIcon from "../../assets/svg/search";

export default function TagList() {
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

  return (
    <div className="tag-list-wrapper">
      <button className="tag-list-btn" onClick={() => setIsOpen(!isOpen)}>
        Tags
      </button>
      {!isLoading && tagsData && isOpen ? (
        <div className="tag-list">
          <div className="tag-list-search">
            <SearchIcon width={18} height={18} />
            <input value={searchInput} onChange={handleChangeSearchInput} />
          </div>
          {filteredTags.map((tag) => (
            <button
              key={tag.id}
              className={`tag-list-item ${
                tags.includes(tag.id) ? "active" : ""
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