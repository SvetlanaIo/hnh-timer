import { PagingData } from "./paging-data";

export interface Paged<T> {
  data: T;
  paging: PagingData;
}
