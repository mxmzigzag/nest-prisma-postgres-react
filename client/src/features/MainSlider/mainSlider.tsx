import React from "react";
import { NavLink } from "react-router-dom";

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
        topViewedPosts.map(({ _max: post, categoryId }) => (
          <Slide
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            description={post.description}
            categoryId={categoryId}
          />
        ))
      ) : (
        <p className="slider-message">Add more categories and posts, please!</p>
      )}
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
