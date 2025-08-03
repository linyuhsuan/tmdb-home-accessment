import MovieFilterModal from '@/components/common/MovieFilterModal';
import { FunnelIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface FilterOptions {
  genres: number[];
  sortBy: string;
}

interface MovieFilterProps {
  genres: Genre[];
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

// 排序選項
const SORT_OPTIONS = [
  { value: 'popularity.desc', label: '熱門度 (高到低)' },
  { value: 'popularity.asc', label: '熱門度 (低到高)' },
  { value: 'vote_average.desc', label: '評分 (高到低)' },
  { value: 'vote_average.asc', label: '評分 (低到高)' },
  { value: 'release_date.desc', label: '上映日期 (新到舊)' },
  { value: 'release_date.asc', label: '上映日期 (舊到新)' },
  { value: 'title.asc', label: '片名 (A-Z)' },
  { value: 'title.desc', label: '片名 (Z-A)' },
];

const MovieFilter: React.FC<MovieFilterProps> = ({ genres, filterOptions, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilterOptions, setTempFilterOptions] = useState<FilterOptions>(filterOptions);

  // 同步外部篩選條件
  useEffect(() => {
    setTempFilterOptions(filterOptions);
  }, [filterOptions]);

  // 電影類型選擇
  const handleGenreToggle = (genreId: number) => {
    setTempFilterOptions(prev => {
      const newGenres = prev.genres.includes(genreId)
        ? prev.genres.filter(id => id !== genreId)
        : [...prev.genres, genreId];
      return { ...prev, genres: newGenres };
    });
  };

  // 排序選擇
  const handleSortChange = (sortBy: string) => {
    setTempFilterOptions(prev => ({ ...prev, sortBy }));
  };

  const handleClearAll = () => {
    setTempFilterOptions(prev => ({ ...prev, genres: [] }));
  };

  const handleSearch = () => {
    console.log('tempFilterOptions', tempFilterOptions);
    onFilterChange(tempFilterOptions);
    setIsFilterOpen(false);
  };

  // 共用的電影類型渲染函數
  const renderGenreTags = (useTempState: boolean = false, isMobile: boolean = false) => {
    const currentGenres = useTempState ? tempFilterOptions.genres : filterOptions.genres;
    const isSelected = (genreId: number) => currentGenres.includes(genreId);
    const isAllSelected = currentGenres.length === 0;

    // 根據桌面版/手機版選擇不同的樣式
    const getButtonClasses = (selected: boolean) => {
      if (isMobile) {
        return selected
          ? 'text-blue-600 bg-blue-50 border-blue-600'
          : 'text-gray-700 bg-gray-100 border-gray-300 hover:bg-gray-200';
      } else {
        return selected
          ? 'text-blue-600 bg-white border-blue-600'
          : 'text-white bg-gray-600 border-gray-500 hover:bg-gray-500 hover:border-gray-400';
      }
    };

    return (
      <>
        {/* 全部類型 tag */}
        <button
          data-testid="clear-filter-button"
          onClick={handleClearAll}
          className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${getButtonClasses(isAllSelected)}`}
        >
          全部類型
        </button>

        {/* 電影類型 tags */}
        {genres?.map(genre => (
          <button
            key={genre.id}
            data-testid={`genre-checkbox-${genre.id}`}
            onClick={() => handleGenreToggle(genre.id)}
            className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${getButtonClasses(isSelected(genre.id))}`}
          >
            {genre.name}
          </button>
        ))}
      </>
    );
  };

  // 排序選項渲染函數
  const renderSortOptions = (useTempState: boolean = false, isMobile: boolean = false) => {
    const currentSortBy = useTempState ? tempFilterOptions.sortBy : filterOptions.sortBy;

    const getSelectClasses = () => {
      if (isMobile) {
        return 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
      } else {
        return 'w-full px-3 py-2 text-sm border border-gray-500 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
      }
    };

    return (
      <select
        data-testid="sort-select"
        value={currentSortBy}
        onChange={e => handleSortChange(e.target.value)}
        className={getSelectClasses()}
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      {/* 篩選按鈕 - 只在手機顯示 */}
      <div className="p-4 lg:hidden">
        <button
          data-testid="filter-button"
          onClick={() => setIsFilterOpen(true)}
          className="flex gap-2 items-center px-3 py-2 text-sm text-white bg-blue-600 rounded-lg shadow-lg transition-colors hover:bg-blue-700"
        >
          <FunnelIcon className="w-4 h-4" />
          篩選
        </button>
      </div>

      {/* 篩選器 - 手機版 */}
      <MovieFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearch={handleSearch}
      >
        <div className="space-y-6">
          {/* 電影類型篩選 */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 lg:text-white">電影類型</h3>
            <div className="flex flex-wrap gap-2">{renderGenreTags(true, true)}</div>
          </div>

          {/* 排序篩選 */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 lg:text-white">排序方式</h3>
            {renderSortOptions(true, true)}
          </div>
        </div>
      </MovieFilterModal>

      {/* 桌面版篩選區塊 */}
      <div className="hidden overflow-y-auto sticky top-0 p-4 w-64 h-screen bg-gray-700 shadow-lg lg:block">
        <h2 className="mb-6 text-xl font-semibold text-white">篩選條件</h2>

        <div className="space-y-6">
          {/* 電影類型篩選 */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">電影類型</h3>
            <div className="flex flex-wrap gap-2">{renderGenreTags(true, false)}</div>
          </div>

          {/* 排序篩選 */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">排序方式</h3>
            {renderSortOptions(true, false)}
          </div>

          {/* 搜尋按鈕 */}
          <button
            data-testid="filter-search-button"
            onClick={handleSearch}
            className="px-4 py-2 mt-4 w-full text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
          >
            搜尋
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(MovieFilter);
