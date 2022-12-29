export interface PaginatedResult<T> {
  startElement: number;
  totalCount: number;
  count: number;
  results: T[]
}
