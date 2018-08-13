export interface Pagination {
  offset: number;
  limit: number;
  total: number;
}

export interface PaginationPage {
  pageNum: number;
  pageOffset: number;
}
