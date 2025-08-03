import { useAppear } from '@/hooks/useAppear';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { Ref } from 'react';

const MovieCard = ({
  movie,
  onClick,
  onHeartClick,
  isLiked = false,
}: {
  movie: any;
  onClick: (movie: any) => void;
  onHeartClick: (movie: any) => void;
  isLiked?: boolean;
}) => {
  const [appearRef, isAppear] = useAppear({ once: true, rootMargin: '200px', threshold: 0.5 });

  const handleClick = () => {
    onClick?.(movie);
  };
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHeartClick(movie);
  };

  const renderMovieCard = () => {
    return (
      <div
        data-testid={`movie-card-${movie.id}`}
        className="flex overflow-hidden flex-col h-full bg-white rounded-lg border border-gray-100 shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105"
        onClick={handleClick}
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
            <div className="flex absolute top-2 right-2 gap-1 items-center z-9">
              <div className="flex justify-center items-center w-6 h-6 text-xs font-bold text-white bg-black bg-opacity-80 rounded-full">
                {movie.vote_average.toFixed(1)}
              </div>
              {/* 愛心 icon */}
              <button
                data-testid={`heart-${movie.id}`}
                data-liked={isLiked}
                onClick={handleHeartClick}
                className="p-2"
              >
                {isLiked ? (
                  <HeartSolid className="w-6 h-6 text-red-500 transition-colors" />
                ) : (
                  <HeartOutline className="w-6 h-6 text-gray-400 transition-colors" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* 卡片內容 */}
        <div className="flex flex-col flex-1 p-3 min-h-0">
          <h3
            data-testid="movie-title"
            className="mb-1 text-sm font-bold leading-tight text-gray-900 line-clamp-2"
          >
            {movie.title}
          </h3>
          <p className="mb-2 text-xs text-gray-500">{movie.release_date}</p>
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
