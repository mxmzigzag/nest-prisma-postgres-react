import { Category } from "./category.types";
import { NewTag, Tag } from "./tag.types";
import { BannedUser } from "./user.types";

export type Post = {
  id: string;
  title: string;
  description: string;
  body: string;
  isPublished: boolean;
  image: string | File;
  authorId: string;
  categoryId: string;
  viewsCount: number;
  author: {
    username: string;
    banned: BannedUser;
  };
  category: Category;
  tags: { tag: Tag }[];
  createdAt: string;
  updatedAt: string;
};

export type CreatePost = {
  title: string;
  description: string;
  body: string;
  image: any;
  authorId: string;
  categoryId: string;
  tags: NewTag[];
};

export type GetPostsByAuthorIdArg = {
  userId: string;
  limit: number;
};

export type PostPagination = {
  totalCount: number;
  posts: Post[];
};

export type TopViewedPost = {
  _max: {
    id: string;
    title: string;
    description: string;
    image: string;
    viewsCount: number;
  };
  categoryId: string;
};

export type GetAllPostsQuery = {
  limit: number;
  searchQuery: string;
  popular?: "asc" | "desc";
  date?: "asc" | "desc";
  category?: Category;
  tags?: string[];
};
