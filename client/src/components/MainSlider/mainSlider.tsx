import React, { useEffect, useState } from "react";
import { topViewedPosts } from "../../dummyData";
import { useFetch } from "../../hooks/useFetch";

import "./mainSlider.css";

type Category = {
  id: number;
  title: string;
  color: string;
};

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: Category;
};

export default function MainSlider() {
  const [slides, setSlides] = useState<Slide[]>(topViewedPosts);
  const { request } = useFetch();

  const getTopPosts = async () => {
    const data = await request("topViewedPosts");
    console.log(data);
  };

  // useEffect(() => {
  //   getTopPosts();
  // }, [getTopPosts]);

  return (
    <div className="slider-wrap">
      {slides.length >= 3 ? (
        slides.map((slide) => (
          <Slide
            key={slide.id}
            id={slide.id}
            title={slide.title}
            image={slide.image}
            description={slide.description}
            category={slide.category}
          />
        ))
      ) : (
        <p className="slider-message">Add more categories and posts, please!</p>
      )}
    </div>
  );
}

const Slide = ({ title, image, description, category }: Slide) => {
  return (
    <div className="slide" style={{ backgroundImage: `url(${image})` }}>
      <div className="slide-content">
        <span
          className="slide-category"
          style={{ backgroundColor: category.color }}
        >
          {category.title}
        </span>
        <p className="slide-title">{title}</p>
        <p className="slide-descr">{description}</p>
      </div>
      <div className="slide-darkness"></div>
    </div>
  );
};
