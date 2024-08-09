import { FindOptions, Sort } from "mongodb";

export type paginationOptions = Pick<FindOptions, "limit" | "skip">;
export type sortOptions = Pick<FindOptions, "sort">;

export interface IPaginateQueryDto {
  page: string | number;
  limit: string | number;
}

export interface ISort {
  sort?: Sort;
}

export interface IFilterQueryDto {
  findField?: string;
  findString?: string;
}

export type IFindDto = Partial<IPaginateQueryDto> &
  Partial<ISort> &
  IFilterQueryDto;

export interface ITotal {
  total: number;
}

export interface IPagination<D> {
  data: D[];
  metadata: IPaginateQueryDto & ITotal;
}

// TODO: change to your list of Collection
// example:
// export type CollectionNames = "Users" | "Posts" | "Cats" (hehe cats)
export type CollectionNames = string;
