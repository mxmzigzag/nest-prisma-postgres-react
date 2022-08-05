import React, { ChangeEvent, useState } from "react";
import { v4 as createUID } from "uuid";

import { Tag, NewTag } from "../../types/tag.types";

type Props = {
  name?: string;
  formTags?: NewTag[];
  existingTags: Tag[];
  setTag: (tag: NewTag) => void;
};

type TagsSuggestionProps = {
  tagsSuggestions: Tag[];
  setTag: (tag: Tag) => void;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function Tags({
  name,
  formTags = [],
  existingTags,
  setTag,
}: Props) {
  const [tagInput, setTagInput] = useState("");

  const tagsSuggestions = existingTags.filter(
    (tag) =>
      !formTags.includes(tag) &&
      tag.name.toLowerCase().includes(tagInput.toLowerCase())
  );

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  return (
    <div className="tags-wrapper">
      {formTags.map((tag) => (
        <div key={tag.id} className="tags-tag">
          {tag.name}
        </div>
      ))}
      <input
        autoComplete="off"
        id={name}
        value={tagInput}
        onChange={handleChange}
        className="tags-input"
      />
      {tagInput.length ? (
        <TagsSuggestions
          tagsSuggestions={tagsSuggestions}
          setTag={setTag}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />
      ) : null}
    </div>
  );
}

const TagsSuggestions = ({
  tagsSuggestions,
  setTag,
  tagInput,
  setTagInput,
}: TagsSuggestionProps) => {
  const handleSelectTag = (tag: NewTag) => {
    setTag(tag);
    setTagInput("");
  };

  return (
    <div className="tags-suggestions">
      {tagsSuggestions.length ? (
        tagsSuggestions.map((tag) => (
          <div
            key={tag.id}
            className="tags-suggestions-item"
            onClick={() => handleSelectTag(tag)}
          >
            {tag.name}
          </div>
        ))
      ) : (
        <div
          className="tags-suggestions-item"
          onClick={() =>
            handleSelectTag({ id: createUID(), name: tagInput, isNew: true })
          }
        >
          {tagInput}
        </div>
      )}
    </div>
  );
};
