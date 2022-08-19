import { User } from "./user.types";
import { Post } from "./post.types";

export type Comment = {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  postId: string;
  post: Post;
  parent?: Comment;
  children: Comment[];
  parentId?: string;
};

export type CreateComment = {
  message: string;
  userId: string;
  postId: string;
  parentId?: string;
};

export type GetAllComments = {
  comments: Comment[];
  totalCount: number;
};
