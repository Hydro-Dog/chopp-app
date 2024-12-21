export type SearchResponse<T> = {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  limit: number;
};
