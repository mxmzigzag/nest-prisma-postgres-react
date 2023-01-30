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

const suggestionItemStyles = "py-1 px-2.5 cursor-pointer hover:bg-bGrayLight";

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
    <div className="flex items-center relative mb-2.5 w-fit">
      {formTags.map((tag) => (
        <div
          key={tag.id}
          className="flex items-center bg-bGrayLight rounded-xl py-0.5 px-2 mr-2.5 relative"
        >
          {tag.name}
          <span
            className="flex absolute -top-[5px] -right-[5px] rounded-full bg-bGray cursor-pointer"
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
        className="outline-0 border-0 border-b-[1px] border-b-solid border-b-black"
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
    <div className="absolute top-full left-0 w-full rounded-br-2 overflow-hidden bg-white">
      {tagsSuggestions.length ? (
        tagsSuggestions.map((tag) => (
          <div
            key={tag.id}
            className={suggestionItemStyles}
            onClick={() => handleSelectTag(tag)}
          >
            {tag.name}
          </div>
        ))
      ) : (
        <div
          className={suggestionItemStyles}
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
