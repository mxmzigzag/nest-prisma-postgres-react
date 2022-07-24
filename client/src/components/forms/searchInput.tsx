import React, { ChangeEvent, useState } from "react";
import SearchIcon from "../../assets/svg/search";

export default function SearchInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search for some post..."
        className="search-input"
        value={value}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={handleSubmit}>
        <SearchIcon width={22} height={22} />
      </button>
    </div>
  );
}
