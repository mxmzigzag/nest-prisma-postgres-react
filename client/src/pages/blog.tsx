import React from "react";

import { posts } from "../data/dummyData";

import BlogActionBar from "../features/BlogActionBar/blogActionBar";
import Posts from "../features/Posts/posts";

export default function Blog() {
  return (
    <div className="blog-wrapper">
      <BlogActionBar />
      <Posts posts={posts} />
    </div>
  );
}
