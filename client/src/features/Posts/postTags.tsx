import React from "react";

import { Tag } from "../../types/tag.types";

type Props = {
  tags: { tag: Tag }[];
  limit?: number;
};

export default function PostTags({ tags, limit = 3 }: Props) {
  const tagsLeft = tags.length - limit;
  return (
    <div className="flex items-center z-10">
      {tags.slice(0, limit).map(({ tag }) => (
        <div className="rounded bg-bBrown px-1 mr-1 text-white" key={tag.name}>
          {tag.name}
        </div>
      ))}
      {tagsLeft > 0 ? (
        <span className="text-sm text-white">+ {tagsLeft} more</span>
      ) : null}
    </div>
  );
}
