import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import {
  useGetOnePostQuery,
  useUpdatePostViewsCountMutation,
} from "../store/api/post.api";

import PostTags from "../features/Posts/postTags";
import Loader from "../components/ui/loader";

import ViewsIcon from "../assets/svg/views";
import CalendarIcon from "../assets/svg/calendar";

export default function Post() {
  const { postId } = useParams();
  const { data: post, isLoading } = useGetOnePostQuery(postId || "");
  const [updateViewsCount] = useUpdatePostViewsCountMutation();

  const handleUpdateViewCount = async (postId: string) => {
    updateViewsCount(postId);
  };

  useEffect(() => {
    handleUpdateViewCount(postId || "");
  }, []);

  return (
    <div className="post-page-wrapper">
      {isLoading || !post ? (
        <Loader />
      ) : (
        <>
          <div
            className="post-page-top"
            style={{
              backgroundImage: `url(http://localhost:5000/${post.image})`,
            }}
          >
            <div className="post-page-top-pills">
              <div
                className="post-category"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.title}
              </div>
              <PostTags tags={post.tags} limit={post.tags.length} />
            </div>
            <div className="post-page-top-content">
              <h1>{post.title}</h1>
              <h3>{post.description}</h3>
            </div>
            <div className="post-page-top-info">
              <div className="post-page-top-info-user">
                {post.author.username}
              </div>
              <div className="post-page-top-info-views">
                <ViewsIcon />
                <span>{post.viewsCount}</span>
              </div>
            </div>
          </div>
          <div className="post-page-content">{post.body}</div>
          <div className="post-page-bottom">
            <CalendarIcon />
            <span className="post-page-bottom-date">
              {dayjs(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
