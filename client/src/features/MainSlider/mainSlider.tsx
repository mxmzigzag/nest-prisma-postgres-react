import React from "react";
import { topViewedPosts } from "../../data/dummyData";

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
  // const { data: slides } = useGetTopViewedPostsQuery();
  // console.log("slides", slides);

  return (
    <div className="slider-wrap">
      {topViewedPosts.length >= 3 ? (
        topViewedPosts.map((slide) => (
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
