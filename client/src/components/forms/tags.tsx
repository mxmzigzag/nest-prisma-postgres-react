import React, { ChangeEvent, useState } from "react";
import { v4 as createUID } from "uuid";

import { useCreateTagMutation } from "../../store/api/tag.api";

import { Tag } from "../../types/tag.types";

type Props = {
  name?: string;
  formTags?: Tag[];
  existingTags: Tag[];
  setTag: (tag: Tag) => void;
};

type TagsSuggestionProps = {
  tagsSuggestions: Tag[];
  setTag: (tag: Tag) => void;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function Tags({
  name,
  formTags = [],
  existingTags,
  setTag,
}: Props) {
  const [tagInput, setTagInput] = useState("");

  const [createTag] = useCreateTagMutation();

  const tagsSuggestions = existingTags.filter(
    (tag) =>
      !formTags.includes(tag) &&
      tag.name.toLowerCase().includes(tagInput.toLowerCase())
  );

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    if (e.code === "Enter") {
      const uid = createUID();
      const newTag = { id: uid, name: e.target.value };
      await createTag(newTag);
      setTag(newTag);
    }
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
      {tagsSuggestions.length && tagInput.length ? (
        <TagsSuggestions
          tagsSuggestions={tagsSuggestions}
          setTag={setTag}
          setTagInput={setTagInput}
        />
      ) : null}
    </div>
  );
}

const TagsSuggestions = ({
  tagsSuggestions,
  setTag,
  setTagInput,
}: TagsSuggestionProps) => {
  const handleSelectTag = (tag: Tag) => {
    setTag(tag);
    setTagInput("");
  };

  return (
    <div className="tags-suggestions">
      {tagsSuggestions.map((tag) => (
        <div
          key={tag.id}
          className="tags-suggestions-item"
          onClick={() => handleSelectTag(tag)}
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};
