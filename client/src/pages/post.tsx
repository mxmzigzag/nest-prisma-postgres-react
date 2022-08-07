import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  useGetOnePostQuery,
  useUpdatePostViewsCountMutation,
} from "../store/api/post.api";

import PostTags from "../features/Posts/postTags";
import Loader from "../components/ui/loader";

import ViewsIcon from "../assets/svg/views";

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
              {post.author.username} {post.viewsCount} <ViewsIcon />
            </div>
          </div>
          <div className="post-page-content">{post.body}</div>
        </>
      )}
    </div>
  );
}
