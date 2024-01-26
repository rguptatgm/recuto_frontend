export interface PaginationDataList<Type> {
  data: Type[];
  pageIndex: number;
  itemsInPage: number;
  isLoading: boolean;
}

export interface DataItem<Type> {
  data?: Type;
  isLoading: boolean;
}

export const getSkipAndLimitFromPage = (args: {
  pageIndex: number;
  itemsInPage: number;
}): any => {
  const skip: number = args.pageIndex * args.itemsInPage;
  const limit: number = args.itemsInPage;
  const sort = { sort: "-system.modifiedAt" };
  return { skip, limit, ...sort };
};
