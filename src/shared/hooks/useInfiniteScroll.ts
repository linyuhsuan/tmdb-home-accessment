import { useRef, useEffect } from 'react';

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin = '200px', // 預設值
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  rootMargin?: string;
}) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('hasNextPage', hasNextPage);
    console.log('isFetchingNextPage', isFetchingNextPage);
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin]);

  return { loaderRef };
}
