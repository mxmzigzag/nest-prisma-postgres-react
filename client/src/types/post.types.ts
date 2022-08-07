import { Category } from "./category.types";
import { NewTag, Tag } from "./tag.types";

export type Post = {
  id: string;
  title: string;
  description: string;
  body: string;
  isPublished: boolean;
  image: string;
  authorId: string;
  categoryId: string;
  viewsCount: number;
  author: {
    username: string;
  };
  category: Category;
  tags: { tag: Tag }[];
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
