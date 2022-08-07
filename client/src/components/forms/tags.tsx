import React, { ChangeEvent, useState } from "react";
import { v4 as createUID } from "uuid";

import { Tag, NewTag } from "../../types/tag.types";

import RejectIcon from "../../assets/svg/reject";

type Props = {
  name?: string;
  formTags?: NewTag[];
  existingTags: Tag[];
  setTags: (tags: NewTag[]) => void;
};

type TagsSuggestionProps = {
  tagsSuggestions: Tag[];
  formTags: Tag[];
  setTags: (tags: Tag[]) => void;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function Tags({
  name,
  formTags = [],
  existingTags,
  setTags,
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

  const handleRemoveTag = (tagId: string) => {
    setTags(formTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="tags-wrapper">
      {formTags.map((tag) => (
        <div key={tag.id} className="tags-tag">
          {tag.name}
          <span
            className="tags-tag-remove"
            onClick={() => handleRemoveTag(tag.id)}
          >
            <RejectIcon width={14} height={14} />
          </span>
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
          setTags={setTags}
          formTags={formTags}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />
      ) : null}
    </div>
  );
}

const TagsSuggestions = ({
  tagsSuggestions,
  setTags,
  formTags,
  tagInput,
  setTagInput,
}: TagsSuggestionProps) => {
  const handleSelectTag = (tag: NewTag) => {
    setTags([...formTags, tag]);
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
