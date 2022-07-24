import React, { useState } from "react";

import BlogActionBar from "../features/BlogActionBar/blogActionBar";
import Posts from "../features/Posts/posts";
import { posts } from "../data/dummyData";

export default function Blog() {
  const [postList, setPostList] = useState(posts);
  return (
    <div className="blog-wrapper">
      <BlogActionBar />
      <Posts posts={postList} />
    </div>
  );
}
