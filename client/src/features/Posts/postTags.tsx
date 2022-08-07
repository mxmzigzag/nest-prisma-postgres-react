import React from "react";

import { Tag } from "../../types/tag.types";

type Props = {
  tags: { tag: Tag }[];
  limit?: number;
};

export default function PostTags({ tags, limit = 3 }: Props) {
  const tagsLeft = tags.length - limit;
  return (
    <div className="post-tags">
      {tags.slice(0, limit).map(({ tag }) => (
        <div className="post-tag" key={tag.name}>
          {tag.name}
        </div>
      ))}
      {tagsLeft > 0 ? (
        <span className="post-tags-message">+ {tagsLeft} more</span>
      ) : null}
    </div>
  );
}
