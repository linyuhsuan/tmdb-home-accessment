import { useRef, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  rootMargin?: string;
}

/**
 * 無限滾動 Hook
 *
 * 使用 Intersection Observer API 實現無限滾動功能。
 * 當指定的元素進入視窗時，自動觸發載入下一頁的函數。
 *
 * @param options - 無限滾動的配置選項
 * @param options.hasNextPage - 是否有下一頁資料
 * @param options.isFetchingNextPage - 是否正在載入下一頁
 * @param options.fetchNextPage - 載入下一頁的函數
 * @param options.rootMargin - Intersection Observer 的 rootMargin，預設為 '200px'
 *
 * @returns 包含 loaderRef 的物件，用於綁定到觸發元素
 */

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin = '200px',
}: UseInfiniteScrollOptions) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 如果沒有下一頁或正在載入，則不設置 observer
    if (!hasNextPage || isFetchingNextPage) return;

    // 創建 Intersection Observer
    const observer = new IntersectionObserver(
      entries => {
        // 當 loader 元素進入視窗時觸發載入
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin },
    );

    // 開始觀察 loader 元素
    if (loaderRef.current) observer.observe(loaderRef.current);

    // 清理函數：停止觀察並斷開連接
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin]);

  return { loaderRef };
}
