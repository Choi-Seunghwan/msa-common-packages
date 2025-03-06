export class PagingResponse<T> {
  readonly items: T[];
  readonly total: number;
  readonly currentPage: number;
  readonly pageSize: number;
  readonly totalPages: number;
  [key: string]: any;

  private constructor(
    items: T[],
    total: number,
    currentPage: number,
    pageSize: number,
    extraArgs?: { [key: string]: any }
  ) {
    this.items = items;
    this.total = total;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(total / pageSize);

    if (extraArgs) {
      Object.keys(extraArgs).forEach((key) => {
        this[key] = extraArgs[key];
      });
    }
  }

  static of<T>(
    items: T[],
    total: number,
    currentPage: number,
    pageSize: number,
    extraArgs?: { [key: string]: any }
  ): PagingResponse<T> {
    return new PagingResponse(items, total, currentPage, pageSize, extraArgs);
  }
}
