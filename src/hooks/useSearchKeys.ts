import { useState, useEffect } from 'react';

/**
 * 搜尋關鍵字管理 Hook
 * 提供搜尋關鍵字的增刪、清除功能，並儲存到 localStorage
 * @returns {string[]} 搜尋關鍵字陣列
 * @returns {(key: string) => void} 新增搜尋關鍵字
 * @returns {() => void} 清除所有搜尋關鍵字
 */
export const useSearchKeys = () => {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const searchKeys = JSON.parse(localStorage.getItem('searchKeys') || '[]');
    setKeys(searchKeys);
  }, []);

  // 新增搜尋關鍵字
  const addKey = (key: string) => {
    if (keys.includes(key)) {
      return;
    }
    const newKeys = [...keys, key];
    setKeys(newKeys);

    localStorage.setItem('searchKeys', JSON.stringify(newKeys));
  };

  // 清除所有搜尋關鍵字
  const clearKeys = () => {
    setKeys([]);
    localStorage.setItem('searchKeys', JSON.stringify([]));
  };

  return [keys, addKey, clearKeys] as const;
};
