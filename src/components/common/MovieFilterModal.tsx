import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';

interface MovieFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: () => void;
  children: React.ReactNode;
}

const MovieFilterModal = React.memo<MovieFilterModalProps>(
  ({ isOpen, onClose, onSearch, children }) => {
    // 控制 body 卷軸的顯示/隱藏
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div data-testid="filter-modal" className="fixed inset-0 z-50 bg-white lg:hidden">
        {/* 選單標題 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">全部篩選</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full transition-colors hover:bg-gray-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 篩選內容 */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          {children}

          {/* 搜尋按鈕 */}
          <button
            data-testid="apply-filter-button"
            onClick={() => {
              onSearch?.();
              onClose();
            }}
            className="px-4 py-2 mt-4 w-full text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
          >
            搜尋
          </button>
        </div>
      </div>
    );
  },
);
export default MovieFilterModal;
