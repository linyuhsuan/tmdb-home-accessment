import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  hasData?: boolean; // 是否有初始數據
  threshold?: number; // 距離底部多少像素時觸發加載
  rootMargin?: string; // Intersection Observer 的 rootMargin
}

interface UseInfiniteScrollReturn {
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasNextPage,
  isLoading,
  hasData = true,
  threshold = 0.1,
  rootMargin = '200px',
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 使用 useCallback 包裹 IntersectionObserver 的回調函數，確保其穩定性
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      // 只有當目標元素進入視窗、有下一頁且目前沒有正在載入時才觸發載入
      if (target.isIntersecting && hasNextPage && !isLoading && hasData) {
        console.log('IntersectionObserver triggered, fetching next page...'); // 除錯日誌
        onLoadMore();
      }
    },
    [onLoadMore, hasNextPage, isLoading, hasData], // 回調函數的依賴項
  );

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin, // 在元素進入視窗底部指定像素時觸發
      threshold,
    });

    observer.observe(currentRef);

    // 清理函數：組件卸載時取消觀察並斷開連接
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect(); // 確保 observer 完全斷開連接
    };
  }, [observerCallback, rootMargin, threshold]); // useEffect 現在只依賴於穩定的 observerCallback

  return { loadMoreRef };
};
