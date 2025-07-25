import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = '搜尋...',
  defaultValue = '',
}) => {
  const [query, setQuery] = useState(defaultValue);

  // Debounce 搜尋，直接在 useEffect 處理
  useEffect(() => {
    if (query !== defaultValue) {
      const timeoutId = setTimeout(() => {
        onSearch(query);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [query, onSearch, defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="px-4 py-2 pr-12 pl-10 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex absolute inset-y-0 left-0 items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="flex absolute inset-y-0 right-0 items-center px-3 text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          搜尋
        </button>
      </div>
    </form>
  );
};
