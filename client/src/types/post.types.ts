export type Post = {
  id: number;
  title: string;
  description: string;
  body: string;
  isPublished: boolean;
  authorId: number;
  categoryId: number;
  viewsCount: number;
  author: {
    userName: string;
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
