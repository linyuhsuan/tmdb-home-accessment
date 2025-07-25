import { useInfiniteQuery } from '@tanstack/react-query';

export interface InfiniteScrollOptions<TData, TError> {
  queryKey: string[];
  queryFn: (pageParam: number) => Promise<TData>;
  getNextPageParam?: (lastPage: TData) => number | undefined;
  initialPageParam?: number;
  staleTime?: number;
}

export interface InfiniteScrollResult<TData, TItem = unknown> {
  data: TItem[] | undefined;
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const useReactQueryFetch = <
  TData extends { page: number; total_pages: number; results: unknown[] },
  TItem = unknown,
>(
  options: InfiniteScrollOptions<TData, Error>,
): InfiniteScrollResult<TData, TItem> => {
  const {
    queryKey,
    queryFn,
    getNextPageParam = (lastPage: TData) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam = 1,
    staleTime = 5 * 60 * 1000,
  } = options;

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = initialPageParam }) => queryFn(pageParam as number),
      getNextPageParam,
      initialPageParam,
      staleTime,
    });

  // 扁平化所有頁面的數據
  const flattenedData = (data?.pages.flatMap(page => page.results) || []) as TItem[];

  return {
    data: flattenedData,
    isLoading,
    error: error as Error | null,
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage,
  };
};
