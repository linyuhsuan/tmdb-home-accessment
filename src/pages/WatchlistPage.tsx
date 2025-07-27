import { useNavigate } from 'react-router-dom';
import { useWatchlistStore } from '@/stores/watchlistStore';
import MovieCard from '@/components/common/MovieCard';
import { PopularMovie } from '@/types/tmdb';
import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/outline';
import WheelModal from '@/components/common/WheelModal';

function WatchlistPage() {
  const { watchlist, getWatchlistCount, removeFromWatchlist } = useWatchlistStore();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);

  return (
    <div className="px-4 py-8 w-full">
      {/* 頁面標題 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">我的待看清單 ({getWatchlistCount()})</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsWheelOpen(true)}
            className="flex gap-2 items-center px-3 py-2 text-sm text-white bg-purple-600 rounded-lg shadow-lg transition-colors hover:bg-purple-700"
          >
            <SparklesIcon className="w-4 h-4" />
            轉盤
          </button>
        </div>
      </div>

      {/* 待看清單內容 */}
      {getWatchlistCount() > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {watchlist.map((movie: PopularMovie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={(movie: PopularMovie) => navigate(`/movie/${movie.id}`)}
              onHeartClick={(movie: PopularMovie) => removeFromWatchlist(movie.id)}
              isLiked={true}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="mb-4 text-6xl">📽️</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-600">你的待看清單是空的</h3>
          <p className="mb-6 text-gray-500">去首頁找一些喜歡的電影加入待看清單吧！</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
          >
            瀏覽熱門電影
          </button>
        </div>
      )}

      {/* 轉盤模態框 */}
      <WheelModal
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        onMovieSelect={movie => {
          navigate(`/movie/${movie.id}`);
          setIsWheelOpen(false);
        }}
      />
    </div>
  );
}

export default WatchlistPage;
