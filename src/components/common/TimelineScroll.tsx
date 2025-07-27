import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

interface TimelineScrollProps {
  children: React.ReactNode;
  className?: string;
  scrollDistance?: number;
}

const TimelineScroll: React.FC<TimelineScrollProps> = ({
  children,
  className = '',
  scrollDistance = 300,
}) => {
  const { scrollContainerRef, scrollLeft, scrollRight } = useHorizontalScroll(scrollDistance);

  return (
    <div className={`relative ${className}`}>
      {/* 左滾動按鈕 */}
      <button
        onClick={scrollLeft}
        className="flex absolute left-[-24px] top-1/2 z-20 justify-center items-center w-12 h-12 bg-white rounded-full shadow-lg transition-all transform -translate-y-1/2 hover:bg-gray-50 hover:scale-110"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* 右滾動按鈕 */}
      <button
        onClick={scrollRight}
        className="flex absolute right-[-24px] top-1/2 z-20 justify-center items-center w-12 h-12 bg-white rounded-full shadow-lg transition-all transform -translate-y-1/2 hover:bg-gray-50 hover:scale-110"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* 時間軸橫線 */}
      <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-300 z-10"></div>

      {/* 滾動容器 */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto px-12 pt-20 pb-4 space-x-6 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TimelineScroll;
