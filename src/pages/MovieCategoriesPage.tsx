import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { tmdbApiRequest } from '@/lib/api/apiService';
import { tmdbApiConfig } from '@/lib/api/apiConfig';
import { MediaListResponse, PopularMovie } from '@/types/tmdb';
import { useMovieSort } from '@/hooks/useMovieSort';
import ReactQueryHandler from '@/components/common/ReactQueryHandler';
import TimelineScroll from '@/components/common/TimelineScroll';
import { formatMonthDay } from '@/lib/utils/dateUtils';

const MovieCategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: moviesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies-categories'],
    queryFn: async () => {
      const [latestMovies, popularMovies, topRatedMovies] = await Promise.all([
        tmdbApiRequest<MediaListResponse>(tmdbApiConfig.latestMovies(1)),
        tmdbApiRequest<MediaListResponse>(tmdbApiConfig.popularMovies(1)),
        tmdbApiRequest<MediaListResponse>(tmdbApiConfig.topRatedMovies(1)),
      ]);
      return {
        latest: latestMovies.results || [],
        popular: popularMovies.results || [],
        topRated: topRatedMovies.results || [],
      };
    },
  });

  // 使用通用排序 hook，按上映日期升序排列
  const sortedLatestMovies = useMovieSort({
    movies: moviesData?.latest || [],
    sortBy: 'release_date.asc',
  });

  const sortedPopularMovies = useMovieSort({
    movies: moviesData?.popular || [],
    sortBy: 'popularity.desc',
  });

  const sortedTopRatedMovies = useMovieSort({
    movies: moviesData?.topRated || [],
    sortBy: 'vote_average.desc',
  });

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  // 渲染電影卡片的函數
  const renderMovieCard = (movie: PopularMovie) => (
    <div key={movie.id} className="relative flex-shrink-0 w-48">
      {/* 時間軸點和日期 */}
      <div className="absolute -top-16 left-1/2 z-50 transform -translate-x-1/2">
        {/* 日期文字 - 在線的上方 */}
        <div className="mb-3 text-center">
          <span className="text-xs font-medium text-white whitespace-nowrap">
            {formatMonthDay(movie.release_date)}
          </span>
        </div>
        {/* 圓點 - 對齊在時間軸線上 */}
        <div className="mx-auto w-3 h-3 bg-gray-400 rounded-full mt-[-8px]"></div>
      </div>

      {/* 電影海報容器 */}
      <div className="relative cursor-pointer group" onClick={() => handleMovieClick(movie.id)}>
        <div className="overflow-hidden w-48 h-72 bg-gray-200 rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full bg-gray-300">
              <span className="text-sm text-gray-500">無海報</span>
            </div>
          )}
        </div>

        {/* 電影標題覆蓋層 */}
        <div className="absolute right-0 bottom-0 left-0 p-3 bg-gradient-to-t to-transparent rounded-b-lg from-black/80">
          <h3 className="text-sm font-medium leading-tight text-white line-clamp-2">
            {movie.title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <ReactQueryHandler
      status={isLoading ? 'loading' : error ? 'error' : 'success'}
      error={error}
      isPending={isLoading}
      onRetry={() => window.location.reload()}
    >
      <div className="py-4 bg-gray-800">
        <div className="px-4 mx-auto space-y-12 max-w-7xl">
          {/* 最新電影區塊 */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">最新上映</h2>
            <TimelineScroll>{sortedLatestMovies.map(renderMovieCard)}</TimelineScroll>
          </div>

          {/* 熱門電影區塊 */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">熱門電影</h2>
            <TimelineScroll>{sortedPopularMovies.map(renderMovieCard)}</TimelineScroll>
          </div>

          {/* 高評分電影區塊 */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">高評分電影</h2>
            <TimelineScroll>{sortedTopRatedMovies.map(renderMovieCard)}</TimelineScroll>
          </div>
        </div>
      </div>
    </ReactQueryHandler>
  );
};

export default MovieCategoriesPage;
