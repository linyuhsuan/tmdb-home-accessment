import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '@/components/common/MovieCard';
import { SearchBar } from '@/components/common/SearchBar';
import ReactQueryHandler from '@/components/common/ReactQueryHandler';
import { useReactQueryFetch } from '@/shared/hooks/useReactQueryFetch';
import { PopularMovie } from '@/types/tmdb';
import type { MediaListResponse } from '@/types/tmdb';
import { tmdbApiRequest } from '@/shared/context/api/apiService';
import { tmdbApiConfig } from '@/shared/context/api/apiConfig';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useWatchlistStore } from '@/stores/watchlistStore';

function MovieListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { isInWatchlist, addWatchlist, removeFromWatchlist } = useWatchlistStore();

  // 熱門電影 API
  const {
    data: allMovies,
    isLoading: isPopularLoading,
    error: popularError,
    fetchNextPage: fetchPopularNextPage,
    hasNextPage: hasPopularNextPage,
    isFetchingNextPage: isFetchingPopularNextPage,
  } = useReactQueryFetch<MediaListResponse, PopularMovie>({
    queryKey: ['popular-movies'],
    queryFn: pageParam => tmdbApiRequest(tmdbApiConfig.latestMovies(pageParam)),
  });

  // 搜尋電影 API
  const {
    data: searchMovies,
    isLoading: isSearchLoading,
    error: searchError,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
    isFetchingNextPage: isFetchingSearchNextPage,
  } = useReactQueryFetch<MediaListResponse, PopularMovie>({
    queryKey: searchQuery ? ['search-movies', searchQuery] : ['search-movies', ''],
    queryFn: pageParam => tmdbApiRequest(tmdbApiConfig.searchMovies(searchQuery, pageParam)),
    enabled: !!searchQuery,
  });

  // 共用列表狀態
  const movies = searchQuery ? searchMovies : allMovies;
  const isLoading = searchQuery ? isSearchLoading : isPopularLoading;
  const error = searchQuery ? searchError : popularError;
  const fetchNextPage = searchQuery ? fetchSearchNextPage : fetchPopularNextPage;
  const hasNextPage = searchQuery ? hasSearchNextPage : hasPopularNextPage;
  const isFetchingNextPage = searchQuery ? isFetchingSearchNextPage : isFetchingPopularNextPage;

  const { loaderRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin: '200px',
  });

  const handleMovieClick = useCallback(
    (movie: PopularMovie) => {
      navigate(`/movie/${movie.id}`);
    },
    [navigate],
  );

  const handleHeartClick = useCallback(
    (movie: PopularMovie) => {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
      } else {
        addWatchlist(movie);
      }
    },
    [isInWatchlist, addWatchlist, removeFromWatchlist],
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* 搜尋欄位 */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} placeholder="搜尋電影..." />
      </div>

      {/* 頁面標題 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">最新電影</h1>
      </div>
      {/* 電影列表 */}
      <ReactQueryHandler
        status={isLoading ? 'loading' : error ? 'error' : 'success'}
        error={error}
        isPending={isLoading}
        onRetry={() => fetchNextPage()}
      >
        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
                onClick={handleMovieClick}
                onHeartClick={handleHeartClick}
                isLiked={isInWatchlist(movie.id)}
              />
            ))}
            {/* loader 放在最後 */}
            <div ref={loaderRef} style={{ height: 1 }} />
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">已無資料</div>
        )}
        {isFetchingNextPage && <div className="py-4 text-center">載入中...</div>}
      </ReactQueryHandler>
    </>
  );
}

export default MovieListPage;
