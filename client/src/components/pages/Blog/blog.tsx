import React, { useState } from "react";

import BlogActionBar from "./actionBar/blogActionBar";
import Posts from "../../Posts/posts";
import { posts } from "../../../dummyData";

import "./blog.css";

export default function Blog() {
  const [postList, setPostList] = useState(posts);
  return (
    <div className="blog-wrapper">
      <BlogActionBar />
      <Posts posts={postList} />
    </div>
  );
}
