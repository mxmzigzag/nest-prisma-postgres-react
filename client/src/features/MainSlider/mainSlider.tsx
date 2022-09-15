import React from "react";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { useGetOneCategoryQuery } from "../../store/api/category.api";
import { useGetTopViewedPostsQuery } from "../../store/api/post.api";

import Loader from "../../components/ui/loader";

type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
};

export default function MainSlider() {
  const { data: topViewedPosts, isLoading } = useGetTopViewedPostsQuery();
  return (
    <div className="slider-wrap">
      {isLoading || !topViewedPosts ? (
        <Loader />
      ) : topViewedPosts.length >= 3 ? (
        <AliceCarousel
          mouseTracking
          disableButtonsControls={true}
          items={topViewedPosts.map(({ _max: post, categoryId }) => (
            <Slide
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image}
              description={post.description}
              categoryId={categoryId}
            />
          ))}
          responsive={{
            0: {
              items: 1,
            },
            1024: { items: 3 },
            1400: { items: 5 },
          }}
        />
      ) : null}
    </div>
  );
}

const Slide = ({ id, title, image, description, categoryId }: Slide) => {
  const { data: category, isLoading } = useGetOneCategoryQuery(categoryId);
  return (
    <NavLink to={`post/${id}`} className="slide-wrap">
      <div
        className="slide"
        style={{ backgroundImage: `url(http://localhost:5000/${image})` }}
      >
        <div className="slide-content">
          {isLoading || !category ? null : (
            <span
              className="slide-category"
              style={{ backgroundColor: category.color }}
            >
              {category.title}
            </span>
          )}
          <p className="slide-title">{title}</p>
          <p className="slide-descr">{description}</p>
        </div>
        <div className="slide-darkness"></div>
      </div>
    </NavLink>
  );
};
