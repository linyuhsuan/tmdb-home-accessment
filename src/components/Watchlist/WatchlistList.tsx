import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { PopularMovie } from '@/types/tmdb';

interface WatchlistListProps {
  watchlist: PopularMovie[];
}

export const WatchlistList: React.FC<WatchlistListProps> = ({ watchlist }) => {
  const { removeFromWatchlist } = useWatchlistStore();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'addedAt' | 'rating' | 'releaseDate'>('addedAt');

  const sortedWatchlist = useMemo(() => {
    return [...watchlist].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.vote_average - a.vote_average;
        case 'releaseDate':
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        default:
          return 0;
      }
    });
  }, [watchlist, sortBy]);

  return (
    <div>
      {/* 排序選項 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">電影列表</h2>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
          className="px-4 py-2 rounded-lg border border-gray-300"
        >
          <option value="addedAt">按加入時間</option>
          <option value="rating">按評分</option>
          <option value="releaseDate">按上映日期</option>
        </select>
      </div>

      {/* 電影網格 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {sortedWatchlist.map((movie: PopularMovie) => (
          <WatchlistItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// 待看清單項目組件
const WatchlistItem: React.FC<{ movie: PopularMovie }> = ({ movie }) => {
  const { removeFromWatchlist } = useWatchlistStore();
  const navigate = useNavigate();

  return (
    <div className="relative bg-white rounded-lg shadow-md transition-shadow group hover:shadow-lg">
      {/* 移除按鈕 */}
      <button
        onClick={() => removeFromWatchlist(movie.id)}
        className="absolute top-2 right-2 z-10 p-1 text-white bg-red-500 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* 電影海報 */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="object-cover w-full h-48 rounded-t-lg cursor-pointer"
        onClick={() => navigate(`/movie/${movie.id}`)}
      />

      {/* 電影資訊 */}
      <div className="p-3">
        <h3 className="mb-1 text-sm font-semibold line-clamp-2">{movie.title}</h3>
        <div className="flex justify-between items-center text-xs text-gray-600">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
