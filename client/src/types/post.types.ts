import { Category } from "./category.types";
import { Tag } from "./tag.types";

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
  tags: Tag[];
};

export type CreatePost = {
  title: string;
  description: string;
  body: string;
  image: File;
  authorId: string;
  categoryId: string;
  tags: Tag[];
};
