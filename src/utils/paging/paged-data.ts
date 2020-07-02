import { AxiosResponse } from "axios";
import { Paged } from "./paged";
import { PagingData } from "./paging-data";
import { PagingResponseReader } from "./paging-response-reader";

export class PagedData<T> implements Paged<T> {
  public readonly data: T;
  public readonly paging: PagingData;

  public constructor(value: AxiosResponse<T>) {
    this.data = value.data;
    this.paging = PagingResponseReader.createData(value.headers);
  }
}
