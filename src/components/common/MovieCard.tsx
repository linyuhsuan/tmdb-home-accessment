import { Ref } from 'react';
import useAppear from '@/shared/hooks/useAppear';

const MovieCard = ({
  movie,
  onClick,
  onAddToWatchlist,
}: {
  movie: any;
  onClick: (movie: any) => void;
  onAddToWatchlist: (movie: any) => void;
}) => {
  const [appearRef, isAppear] = useAppear({ once: true, rootMargin: '200px', threshold: 0.5 });
  const handleClick = () => {
    onClick?.(movie);
  };
  const handleAddToWatchlist = (movie: any) => {
    onAddToWatchlist(movie);
  };

  const renderMovieCard = () => {
    return (
      <div
        className="flex overflow-hidden flex-col h-full bg-white rounded-lg border border-gray-100 shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105"
        // onClick={handleClick}
      >
        {/* 海報圖片 */}
        {movie.poster_path && (
          <div className="relative aspect-[2/3] flex-shrink-0">
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              srcSet={`https://image.tmdb.org/t/p/w342${movie.poster_path} 1x, https://image.tmdb.org/t/p/w500${movie.poster_path} 2x, https://image.tmdb.org/t/p/w780${movie.poster_path} 3x`}
              alt={movie.title}
              className="object-cover w-full h-full"
            />
            {/* 評分徽章 */}
            <div className="flex absolute top-2 right-2 z-10 gap-1 items-center">
              <div className="flex justify-center items-center w-6 h-6 text-xs font-bold text-white bg-black bg-opacity-80 rounded-full">
                {movie.vote_average.toFixed(1)}
              </div>
              {/* 愛心 icon */}
              <button
                type="button"
                className="flex justify-center items-center w-6 h-6 bg-white bg-opacity-80 rounded-full shadow hover:text-red-600"
                onClick={() => handleAddToWatchlist(movie)}
                aria-label="加入待看清單"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 text-red-500">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* 卡片內容 */}
        <div className="flex flex-col flex-1 p-3 min-h-0">
          <h3 className="mb-1 text-sm font-bold leading-tight text-gray-900 line-clamp-2">
            {movie.title}
          </h3>
          <p className="mb-2 text-xs text-gray-500">{movie.release_date}</p>
          <p className="flex-1 text-xs leading-relaxed text-gray-600 line-clamp-2">
            {movie.overview || '暫無劇情簡介'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full" ref={appearRef as Ref<HTMLDivElement>}>
      {isAppear && renderMovieCard()}
    </div>
  );
};

export default MovieCard;
