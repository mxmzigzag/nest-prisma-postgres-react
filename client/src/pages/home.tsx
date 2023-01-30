import React from "react";

import Blog from "./blog";
import MainSlider from "../features/MainSlider/mainSlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <div className="w-full max-w-[1200px] mx-auto py-4 px-6">
        <Blog />
      </div>
    </>
  );
}
