import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

import "./mainSlider.css";

type Slide = {
  id: number;
  title: string;
  category: string;
};

export default function MainSlider() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: 0, title: "Title", category: "Sport" },
    { id: 1, title: "Title", category: "Space" },
    { id: 2, title: "Title", category: "Science" },
  ]);
  const { request } = useFetch();

  const getTopPosts = async () => {
    const data = await request("topPosts");
    console.log(data);
  };

  useEffect(() => {
    getTopPosts();
  }, []);

  return (
    <div className="sliderWrap">
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
        <p className="sliderMessage">Add more categories and posts, please!</p>
      )}
    </div>
  );
}

const Slide = ({ title, category }: Slide) => {
  return (
    <div className="slide">
      <div className="slideContent">
        <span className="slideCategory">{category}</span>
        <p className="slideTitle">{title}</p>
      </div>
    </div>
  );
};
