import { useWatchlistStore } from '@/stores/watchlistStore';
import { useEffect, useRef, useState } from 'react';

interface WheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpin?: (result: string) => void;
  onMovieSelect?: (movie: any) => void;
}

const WheelModal: React.FC<WheelModalProps> = ({ isOpen, onClose, onSpin, onMovieSelect }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [showMovieResult, setShowMovieResult] = useState(false);
  const doorsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 獲取待看清單
  const { watchlist } = useWatchlistStore();

  // 組件掛載時初始化
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => init(true), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 如果待看清單為空，顯示提示
  if (watchlist.length === 0) {
    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="flex relative z-10 flex-col justify-center items-center p-8 mx-4 w-full max-w-md bg-gray-800 rounded-2xl">
          <div className="flex justify-between items-center mb-8 w-full">
            <h2 className="text-2xl font-bold text-white">電影轉盤</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-700 rounded-full transition-colors hover:bg-gray-600"
            >
              <span className="text-white">✕</span>
            </button>
          </div>
          <div className="text-center text-white">
            <div className="mb-4 text-6xl">📽️</div>
            <h3 className="mb-2 text-xl font-semibold">你的待看清單是空的</h3>
            <p className="text-gray-300">先加入一些電影到待看清單，再來使用轉盤功能吧！</p>
          </div>
        </div>
      </div>
    );
  }

  // 打亂陣列函數
  const shuffle = (arr: any[]) => {
    const shuffled = [...arr];
    let m = shuffled.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
    }
    return shuffled;
  };

  // 初始化門
  const initDoor = (
    doorIndex: number,
    firstInit = true,
    groups = 1,
    duration = 1,
    targetMovie: any = null,
  ) => {
    const door = doorsRef.current[doorIndex];
    if (!door) return;

    const boxes = door.querySelector('.boxes') as HTMLElement;
    if (!boxes) return;

    const boxesClone = boxes.cloneNode(false) as HTMLElement;
    const pool = [{ id: 'question', title: '❓', poster_path: null }];

    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...watchlist);
      }

      // 如果有目標電影，確保它在最終位置
      if (targetMovie) {
        const filteredArr = arr.filter(movie => movie.id !== targetMovie.id);
        pool.push(...shuffle(filteredArr));
        pool.push(targetMovie); // 確保目標電影在最後
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
      box.className =
        'flex flex-col justify-center items-center w-24 h-36 text-xs bg-gray-200 rounded box';

      const movie = pool[i];
      if (movie.id === 'question') {
        box.innerHTML = '<div class="text-2xl">❓</div>';
      } else {
        box.innerHTML = `
          <div class="mb-1 w-16 h-20">
            ${
              movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w92${movie.poster_path}" alt="${movie.title}" class="object-cover w-full h-full rounded" />`
                : '<div class="flex justify-center items-center w-full h-full text-xs bg-gray-300 rounded">📽️</div>'
            }
          </div>
          <div class="px-1 text-xs text-center line-clamp-2">${movie.title}</div>
        `;
      }
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

  // 旋轉函數
  const spin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowMovieResult(false);
    setSelectedMovie(null);

    // 決定是否要獲勝（60% 機率獲勝）
    const shouldWin = Math.random() < 0.6;
    let targetMovie = null;

    if (shouldWin) {
      targetMovie = watchlist[Math.floor(Math.random() * watchlist.length)];
    }

    // 初始化每個門的旋轉
    const spinPromises = [];
    for (let i = 0; i < 3; i++) {
      const doorTargetMovie = shouldWin ? targetMovie : null;
      spinPromises.push(initDoor(i, false, 1, 1 + i * 0.5, doorTargetMovie));
    }

    // 等待所有動畫完成
    await Promise.all(spinPromises);
    setIsSpinning(false);

    // 檢查是否獲勝
    if (shouldWin && targetMovie) {
      setSelectedMovie(targetMovie);
      setShowMovieResult(true);

      // 等待3秒後調用電影選擇回調
      setTimeout(() => {
        onMovieSelect?.(targetMovie);
      }, 3000);
    }

    // 調用 onSpin 回調
    if (onSpin && targetMovie) {
      onSpin(targetMovie.title);
    }
  };

  // 重置函數
  const reset = () => {
    if (isSpinning) return;
    init(true);
    setShowMovieResult(false);
    setSelectedMovie(null);
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* 轉盤容器 */}
      <div className="flex relative z-10 flex-col justify-center items-center p-8 mx-4 w-full max-w-md bg-gray-800 rounded-2xl">
        {/* 標題 */}
        <div className="flex justify-between items-center mb-8 w-full">
          <h2 className="text-2xl font-bold text-white">電影轉盤</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-700 rounded-full transition-colors hover:bg-gray-600"
          >
            <span className="text-white">✕</span>
          </button>
        </div>

        {/* 轉盤門 */}
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
                <div className="flex flex-col justify-center items-center w-24 h-36 text-2xl bg-gray-200 rounded box">
                  ❓
                </div>
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
            {isSpinning ? '轉動中...' : '轉動'}
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
            重置
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
