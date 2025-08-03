import { useSearchKeys } from '@/hooks/useSearchKeys'; // 確保路徑正確
import React, { useEffect, useRef, useState } from 'react';

/**
 * @interface SearchBarProps
 * @property {(query: string) => void} onSearch - 當搜尋被觸發時呼叫的回調函數，傳遞當前的搜尋字串。
 * @property {string} [placeholder='搜尋...'] - 輸入框的佔位符文本。
 * @property {string} [defaultValue=''] - 輸入框的預設值。
 */
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

/**
 * SearchBar 元件提供一個搜尋輸入框，包含搜尋歷史紀錄功能和 debounce 搜尋。
 *
 * @param {SearchBarProps} props - SearchBar 元件的屬性。
 * @returns {React.FC<SearchBarProps>} SearchBar React 元件。
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = '搜尋...',
  defaultValue = '',
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [searchKeys, addKey, clearKeys] = useSearchKeys();
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  /**
   * 處理字串去空白、呼叫 `onSearch`。
   * 如果去空白後的字串不為空，則將其加入歷史紀錄，並隱藏歷史區塊。
   */
  const executeSearch = () => {
    const trimmedQuery = query.trim();
    onSearch(trimmedQuery);
    if (trimmedQuery) {
      addKey(trimmedQuery);
    }
    setIsHistoryVisible(false);
  };

  /**
   * 處理搜尋按鈕點擊事件。
   * 呼叫 `executeSearch` 執行搜尋。
   */
  const handleSearchButtonClick = () => {
    executeSearch();
  };

  /**
   * 處理輸入框的鍵盤按下事件。
   * 當按下 Enter 鍵時，阻止預設行為並執行搜尋。
   * @param {React.KeyboardEvent<HTMLInputElement>} e - 鍵盤事件物件。
   */
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    }
  };

  /**
   * 處理點擊搜尋歷史紀錄項目事件。
   * 將輸入框內容設定為點擊的歷史項目，執行搜尋，並更新歷史紀錄。
   * @param {string} item - 被點擊的歷史紀錄字串。
   */
  const handleHistoryClick = (item: string) => {
    setQuery(item);
    onSearch(item);
    addKey(item);
    setIsHistoryVisible(false);
  };

  /**
   * 清除所有搜尋歷史紀錄。
   * 清空輸入框、清除儲存的歷史紀錄，並觸發一次空搜尋。
   */
  const handleClearAllKeys = () => {
    setQuery('');
    clearKeys();
    onSearch('');
  };

  /**
   * 偵測點擊外部區域以隱藏搜尋歷史區塊。
   * 在元件掛載時添加事件監聽器，在元件卸載時移除。
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsHistoryVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={searchBarRef}>
      <div className="relative">
        <input
          data-testid="search-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsHistoryVisible(true)}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="px-4 py-2 pr-12 pl-10 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleSearchButtonClick}
          className="flex absolute inset-y-0 right-0 items-center px-3 text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          搜尋
        </button>
      </div>
      {/* 搜尋歷史區塊，只要 isHistoryVisible 為 true 就顯示 */}
      {isHistoryVisible && (
        <div className="absolute right-0 left-0 top-full z-10 p-4 mt-1 bg-white rounded-b-lg border border-gray-300 shadow-lg">
          {searchKeys.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-500">搜尋歷史</h3>
                <span
                  onClick={handleClearAllKeys}
                  className="text-sm text-blue-600 underline cursor-pointer hover:text-blue-800"
                >
                  清除歷史紀錄
                </span>
              </div>
              <ul className="space-y-1">
                {searchKeys.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="p-1 text-gray-800 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleHistoryClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="py-2 text-sm text-center text-gray-500">沒有搜尋歷史紀錄</p>
          )}
        </div>
      )}
    </div>
  );
};
