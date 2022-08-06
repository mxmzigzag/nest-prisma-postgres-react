export type Category = {
  id: string;
  title: string;
  color: string;
};

export type CategoryQuery = {
  offset?: number;
  limit?: number;
};

export type CategoryPagination = {
  totalCount: number;
  totalPages: number;
  page: Category[];
};
