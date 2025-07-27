import { useState, useEffect, useRef } from 'react';
import { useWatchlistStore } from '@/stores/watchlistStore';

interface WheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpin?: (result: string) => void;
  onMovieSelect?: (movie: any) => void;
}

const WheelModal: React.FC<WheelModalProps> = ({ isOpen, onClose, onSpin, onMovieSelect }) => {
  const items = ['7️⃣', '❌', '🍓', '🍋', '🍉', '🍒', '💵', '🍊', '🍎'];

  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [showMovieResult, setShowMovieResult] = useState(false);
  const doorsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 獲取待看清單
  const { watchlist } = useWatchlistStore();

  // 打亂陣列函數（增加成功機率）
  const shuffle = (arr: string[]) => {
    const shuffled = [...arr];
    let m = shuffled.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
    }
    return shuffled;
  };

  // 增加成功機率的符號選擇
  const getWinningSymbol = () => {
    // 70% 機率返回熱門符號，30% 機率隨機
    if (Math.random() < 0.7) {
      const popularSymbols = ['🍒', '🍋', '7️⃣', '💵', '🍊'];
      return popularSymbols[Math.floor(Math.random() * popularSymbols.length)];
    }
    return items[Math.floor(Math.random() * items.length)];
  };

  // 初始化門
  const initDoor = (
    doorIndex: number,
    firstInit = true,
    groups = 1,
    duration = 1,
    targetSymbol: string | null = null,
  ) => {
    const door = doorsRef.current[doorIndex];
    if (!door) return;

    const boxes = door.querySelector('.boxes') as HTMLElement;
    if (!boxes) return;

    const boxesClone = boxes.cloneNode(false) as HTMLElement;
    const pool = ['❓'];

    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...items);
      }

      // 如果有目標符號，確保它在最終位置
      if (targetSymbol) {
        // 移除目標符號避免重複
        const filteredArr = arr.filter(item => item !== targetSymbol);
        pool.push(...shuffle(filteredArr));
        pool.push(targetSymbol); // 確保目標符號在最後（最終顯示位置）
      } else {
        pool.push(...shuffle(arr));
      }
    }

    // 清空 boxesClone 的內容
    boxesClone.innerHTML = '';
    boxesClone.className = 'transition-transform duration-1000 ease-in-out boxes';
    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;

    for (let i = pool.length - 1; i >= 0; i--) {
      const box = document.createElement('div');
      box.className = 'flex justify-center items-center w-24 h-36 text-5xl box';
      box.textContent = pool[i];
      boxesClone.appendChild(box);
    }

    boxesClone.style.transform = `translateY(-${36 * 4 * (pool.length - 1)}px)`;
    door.replaceChild(boxesClone, boxes);

    return new Promise<void>(resolve => {
      if (firstInit) {
        resolve();
        return;
      }

      // 添加動畫事件監聽器
      const handleTransitionStart = () => {
        boxesClone.querySelectorAll('.box').forEach((box: Element) => {
          (box as HTMLElement).style.filter = 'blur(1px)';
        });
      };

      const handleTransitionEnd = () => {
        boxesClone.querySelectorAll('.box').forEach((box: Element, index: number) => {
          (box as HTMLElement).style.filter = 'blur(0)';
          if (index > 0) boxesClone.removeChild(box);
        });
        resolve();
      };

      boxesClone.addEventListener('transitionstart', handleTransitionStart, { once: true });
      boxesClone.addEventListener('transitionend', handleTransitionEnd, { once: true });

      // 觸發動畫
      setTimeout(() => {
        boxesClone.style.transform = 'translateY(0)';
      }, 10);
    });
  };

  // 初始化所有門
  const init = (firstInit = true) => {
    for (let i = 0; i < 3; i++) {
      initDoor(i, firstInit, 1, 1);
    }
  };

  // 旋轉函數（增加成功機率）
  const spin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowMovieResult(false);
    setSelectedMovie(null);

    // 決定是否要獲勝（60% 機率獲勝）
    const shouldWin = Math.random() < 0.6;
    let targetSymbol = null;

    if (shouldWin) {
      targetSymbol = getWinningSymbol();
    }

    // 初始化每個門的旋轉
    const spinPromises = [];
    for (let i = 0; i < 3; i++) {
      const doorTargetSymbol = shouldWin ? targetSymbol : null;
      spinPromises.push(initDoor(i, false, 1, 1 + i * 0.5, doorTargetSymbol));
    }

    // 等待所有動畫完成
    await Promise.all(spinPromises);
    setIsSpinning(false);

    // 檢查是否三個符號相同且有待看清單
    if (shouldWin && targetSymbol && watchlist.length > 0) {
      // 從待看清單中隨機選擇一部電影
      const randomMovie = watchlist[Math.floor(Math.random() * watchlist.length)];
      setSelectedMovie(randomMovie);
      setShowMovieResult(true);

      // 等待3秒後調用電影選擇回調
      setTimeout(() => {
        onMovieSelect?.(randomMovie);
      }, 3000);
    }

    // 調用 onSpin 回調
    if (onSpin && targetSymbol) {
      onSpin(targetSymbol);
    }
  };

  // 重置函數
  const reset = () => {
    if (isSpinning) return;
    init(true);
    setShowMovieResult(false);
    setSelectedMovie(null);
  };

  // 組件掛載時初始化
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => init(true), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* 拉霸機容器 */}
      <div className="flex relative z-10 flex-col justify-center items-center p-8 mx-4 w-full max-w-md bg-gray-800 rounded-2xl">
        {/* 標題 */}
        <div className="flex justify-between items-center mb-8 w-full">
          <h2 className="text-2xl font-bold text-white">拉霸機</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-700 rounded-full transition-colors hover:bg-gray-600"
          >
            <span className="text-white">✕</span>
          </button>
        </div>

        {/* 拉霸機門 */}
        <div className="flex gap-4 mb-8">
          {[0, 1, 2].map(index => (
            <div
              key={index}
              ref={el => {
                if (el) {
                  doorsRef.current[index] = el;
                }
              }}
              className="overflow-hidden w-24 h-36 bg-gray-100 rounded-lg border-2 border-gray-300 shadow-inner"
              style={{
                boxShadow: '0 0 3px 2px rgba(0, 0, 0, 0.4) inset',
              }}
            >
              <div className="transition-transform duration-1000 ease-in-out boxes">
                <div className="flex justify-center items-center w-24 h-36 text-5xl box">❓</div>
              </div>
            </div>
          ))}
        </div>

        {/* 按鈕 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`
              px-6 py-3 text-lg font-bold uppercase rounded-lg transition-all duration-200
              ${
                isSpinning
                  ? 'text-gray-300 bg-gray-500 cursor-not-allowed'
                  : 'text-white bg-blue-600 shadow-lg transform hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95'
              }
            `}
          >
            {isSpinning ? 'Spinning...' : 'Spin'}
          </button>

          <button
            onClick={reset}
            disabled={isSpinning}
            className={`
              px-6 py-3 text-lg font-bold uppercase rounded-lg transition-all duration-200
              ${
                isSpinning
                  ? 'text-gray-300 bg-gray-500 cursor-not-allowed'
                  : 'text-white bg-red-600 shadow-lg transform hover:bg-red-700 hover:shadow-xl hover:scale-105 active:scale-95'
              }
            `}
          >
            Reset
          </button>
        </div>

        {/* 電影結果顯示 */}
        {showMovieResult && selectedMovie && (
          <div className="p-4 mb-4 w-full text-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-300">
            <div className="mb-2 text-lg font-bold text-gray-800">
              🎉 恭喜中獎！請等3秒後取得電影
            </div>
            <div className="mb-2 text-sm text-gray-600">從你的待看清單中取得：</div>
            <div className="flex gap-3 justify-center items-center">
              {selectedMovie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="w-12 rounded shadow-md h-18"
                />
              )}
              <div className="text-left">
                <div className="font-bold text-gray-800">{selectedMovie.title}</div>
                <div className="text-sm text-gray-600">
                  {selectedMovie.release_date && new Date(selectedMovie.release_date).getFullYear()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelModal;
