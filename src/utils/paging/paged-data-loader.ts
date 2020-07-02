import { Paged } from "./paged";
import { PagingData } from "./paging-data";
import { PagingResponseReader } from "./paging-response-reader";

export class PagedDataLoader<T> implements Paged<T> {
  public readonly data: T;

  public readonly paging: PagingData;

  public constructor(empty: T) {
    this.data = empty;
    this.paging = PagingResponseReader.createEmpty();
  }
}
