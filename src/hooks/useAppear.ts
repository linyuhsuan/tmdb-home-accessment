import { useRef, useState, useEffect } from 'react';

// lazy load
export const useAppear = (params: { once?: boolean; threshold?: number; rootMargin?: string }) => {
  const { once, threshold, rootMargin } = params;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isAppear, setIsAppear] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsAppear(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setIsAppear(false);
          }
        });
      },
      { threshold, rootMargin },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, isAppear];
};
