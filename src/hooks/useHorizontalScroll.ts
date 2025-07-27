import { useRef } from 'react';

interface UseHorizontalScrollReturn {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  scrollLeft: () => void;
  scrollRight: () => void;
}

export const useHorizontalScroll = (scrollDistance: number = 300): UseHorizontalScrollReturn => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  return {
    scrollContainerRef,
    scrollLeft,
    scrollRight,
  };
};
