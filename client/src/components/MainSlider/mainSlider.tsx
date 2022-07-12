import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";

import "./mainSlider.css";

type Slide = {
  id: number;
  title: string;
  category: string;
};

export default function MainSlider() {
  const slides: Slide[] = [
    { id: 0, title: "Title", category: "Sport" },
    { id: 1, title: "Title", category: "Space" },
    { id: 2, title: "Title", category: "Science" },
  ];
  const { request } = useFetch();

  const getTopPosts = async () => {
    const data = await request("topPosts");
    console.log(data);
  };

  useEffect(() => {
    getTopPosts();
  }, [getTopPosts]);

  return (
    <div className="slider-wrap">
      {slides.length >= 3 ? (
        slides.map((slide) => (
          <Slide
            key={slide.id}
            id={slide.id}
            title={slide.title}
            category={slide.category}
          />
        ))
      ) : (
        <p className="slider-message">Add more categories and posts, please!</p>
      )}
    </div>
  );
}

const Slide = ({ title, category }: Slide) => {
  return (
    <div className="slide">
      <div className="slide-content">
        <span className="slide-category">{category}</span>
        <p className="slide-title">{title}</p>
      </div>
    </div>
  );
};
