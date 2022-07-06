import React from "react";

import "./searchInput.css";

export default function SearchInput() {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for some post..."
        className="searchInput"
      />
    </div>
  );
}
