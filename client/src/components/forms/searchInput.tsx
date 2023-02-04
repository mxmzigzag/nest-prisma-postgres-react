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
    <div className="relative ml-auto">
      <input
        type="text"
        placeholder="Search for some post..."
        className="border-[1px] border-bGray rounded py-1 pr-11 pl-2.5 outline-0"
        value={value}
        onChange={handleChange}
      />
      <button
        className="flex items-center justify-center absolute top-1/2 right-1 -translate-y-1/2 bg-none border-0 outline-0 cursor-pointer"
        onClick={handleSubmit}
      >
        <SearchIcon width={22} height={22} />
      </button>
    </div>
  );
}
