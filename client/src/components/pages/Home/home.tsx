import React from "react";
import Blog from "../Blog/blog";
import MainSlider from "../../MainSlider/mainSlider";

import "./home.scss";

export default function Home() {
  return (
    <>
      <MainSlider />
      <div className="main-wrapper">
        <Blog />
      </div>
    </>
  );
}
