export type Post = {
  id: number;
  title: string;
  description: string;
  body: string;
  isPublished: boolean;
  image: string;
  authorId: number;
  categoryId: number;
  viewsCount: number;
  author: {
    username: string;
  };
  category: {
    id: number;
    title: string;
  };
  tags: Tag[];
};

export type Tag = {
  tag: {
    name: string;
  };
};

export type CreatePost = {
  title: string;
  description: string;
  body: string;
  image: string;
  authorId: number;
  categoryId: number;
  tags: Tag[];
};
