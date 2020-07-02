import { PagingData } from "./paging-data";

export class PagingResponseReader {
  private static pageHeader = "X-Page";
  private static perPageHeader = "X-Per-Page";
  private static totalPagesHeader = "X-Total-Pages";
  private static totalHeader = "X-Total";
  private static totalFilteredHeader = "X-Total-Filtered";

  public static createData(responseHeaders: unknown) {
    const headers = responseHeaders as object;
    const result = {
      page: this.getNumberValue(headers, this.pageHeader),
      perPage: this.getNumberValue(headers, this.perPageHeader),
      totalPages: this.getNumberValue(headers, this.totalPagesHeader),
      total: this.getNumberValue(headers, this.totalHeader),
      totalFiltered: this.getNumberValue(headers, this.totalFilteredHeader),
    } as PagingData;
    return result;
  }

  public static createEmpty() {
    const result = {
      page: 0,
      perPage: 0,
      totalPages: 0,
      total: 0,
      totalFiltered: 0,
    } as PagingData;
    return result;
  }

  private static getNumberValue(headers: object, propName: string): number {
    if (this.hasNumberProp(headers, propName)) {
      return headers[propName];
    }
    return -1;
  }

  private static hasNumberProp<T extends object, K extends PropertyKey>(
    obj: T,
    propKey: K,
  ): obj is T &
    {
      [key in K]: number;
    } {
    return propKey in obj;
  }
}
