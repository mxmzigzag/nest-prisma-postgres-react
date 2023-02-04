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
    <div className="flex items-center justify-center">
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
            0: { items: 1 },
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
    <NavLink to={`post/${id}`} className="w-1/5">
      <div
        className={slideStyles}
        style={{ backgroundImage: `url(${process.env.APP_URL}/${image})` }}
      >
        <div className="mt-auto z-10">
          {isLoading || !category ? null : (
            <span
              className="py-0.5 px-1.5 rounded text-white"
              style={{ backgroundColor: category.color }}
            >
              {category.title}
            </span>
          )}
          <p className="text-[20px] text-white my-4">{title}</p>
          <p className="text-base text-white">{description}</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 transtition-all group-hover:opacity-0 group-hover:transition-all"></div>
      </div>
    </NavLink>
  );
};

const slideStyles = `
  flex 
  group
  min-h-[430px] 
  py-10 
  px-2.5 
  relative 
  bg-[length:270%] 
  bg-right 
  transition-all 
  hover:bg-[length:280%] 
  before:absolute 
  before:top-0 
  before:left-0 
  before:w-full 
  before:h-full 
  before:bg-bBgGradient 
  before:transition-all

`;
