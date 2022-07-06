import React from "react";
import Blog from "../Blog/blog";
import MainSlider from "../MainSlider/mainSlider";

import "./home.css";

export default function Home() {
  return (
    <>
      <MainSlider />
      <div className="mainWrapper">
        <Blog />
      </div>
    </>
  );
}
