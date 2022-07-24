import React from "react";

import Blog from "./blog";
import MainSlider from "../features/MainSlider/mainSlider";

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
