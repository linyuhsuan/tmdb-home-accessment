import { useCallback, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tmdbApiConfig } from '@/lib/api/apiConfig';
import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import { tmdbApiRequest } from '@/lib/api/apiService';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ReactQueryHandler from '@/components/common/ReactQueryHandler';
import { useQuery } from '@tanstack/react-query';
import MovieFilter from '@/components/common/MovieFilter';
import { SearchBar } from '@/components/common/SearchBar';
import MovieCard from '@/components/common/MovieCard';
import { useWatchlistStore } from '@/stores/watchlistStore';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

interface MoviesPage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

// 篩選條件介面
interface FilterOptions {
  genres: number[];
  sortBy: string;
}

const MovieListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'popular'; // 預設為 popular
  const [searchQuery, setSearchQuery] = useState('');

  // 收藏功能
  const { addWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();

  // 篩選狀態管理
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    genres: [],
    sortBy: 'popularity.desc',
  });

  // 獲取電影類型
  const { data: genresData } = useQuery<GenresResponse>({
    queryKey: ['movie-genres'],
    queryFn: () => tmdbApiRequest<GenresResponse>(tmdbApiConfig.movieGenres()),
    staleTime: 0,
  });

  // 根據類別選擇 API
  const getQueryFn = useCallback(
    (pageParam: number): Promise<MoviesPage> => {
      // 如果有搜尋查詢，使用搜尋 API
      if (searchQuery.trim()) {
        return tmdbApiRequest<MoviesPage>(
          tmdbApiConfig.searchMovies(searchQuery.trim(), pageParam),
        );
      }

      // 根據類別選擇對應的 API
      switch (category) {
        case 'now-playing':
          return tmdbApiRequest<MoviesPage>(tmdbApiConfig.latestMovies(pageParam));
        case 'top-rated':
          return tmdbApiRequest<MoviesPage>(tmdbApiConfig.topRatedMovies(pageParam));
        case 'popular':
        default:
          return tmdbApiRequest<MoviesPage>(tmdbApiConfig.popularMovies(pageParam));
      }
    },
    [category, searchQuery],
  );

  const {
    data: rawData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useReactQueryFetch<MoviesPage, Movie>({
    queryKey: ['movies-list', category, searchQuery],
    queryFn: getQueryFn,
    initialPageParam: 1,
  });

  // 根據篩選條件過濾和排序電影
  const filteredData = useMemo(() => {
    if (!rawData) return [];

    // 先過濾
    const filtered = rawData.filter(movie => {
      // 如果有選擇電影類型，檢查電影是否包含任一選擇的類型
      if (filterOptions.genres.length > 0) {
        const hasMatchingGenre = movie.genre_ids.some(genreId =>
          filterOptions.genres.includes(genreId),
        );
        if (!hasMatchingGenre) return false;
      }

      return true;
    });

    // 再排序
    const sorted = [...filtered].sort((a, b) => {
      switch (filterOptions.sortBy) {
        case 'release_date.desc':
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case 'release_date.asc':
          return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        case 'title.asc':
          return a.title.localeCompare(b.title);
        case 'title.desc':
          return b.title.localeCompare(a.title);
        case 'popularity.desc':
          return b.popularity - a.popularity;
        case 'popularity.asc':
          return a.popularity - b.popularity;
        case 'vote_average.desc':
          return b.vote_average - a.vote_average;
        case 'vote_average.asc':
          return a.vote_average - b.vote_average;
        default:
          return 0;
      }
    });

    return sorted;
  }, [rawData, filterOptions.genres, filterOptions.sortBy]);

  const handleMovieClick = useCallback(
    (movie: Movie) => {
      navigate(`/movie/${movie.id}`);
    },
    [navigate],
  );

  const handleHeartClick = useCallback(
    (movie: Movie) => {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
      } else {
        addWatchlist(movie);
      }
    },
    [addWatchlist, removeFromWatchlist, isInWatchlist],
  );

  // 搜尋處理函數
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 篩選器回調函數
  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    console.log('filterOptions', newFilters);
  }, []);

  // 使用 useInfiniteScroll hook
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage: hasNextPage || false,
    isLoading: isFetchingNextPage,
    hasData: filteredData && filteredData.length > 0,
    rootMargin: '200px',
  });

  return (
    <ReactQueryHandler
      status={isLoading ? 'loading' : error ? 'error' : 'success'}
      error={error}
      isPending={isLoading}
      onRetry={() => window.location.reload()}
    >
      <div className="flex flex-col min-h-screen lg:flex-row">
        {/* 篩選器元件 */}
        {genresData && (
          <MovieFilter
            genres={genresData.genres}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* 電影列表區塊 */}
        <div className="flex-1 p-6 lg:pt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">
              <>
                {category === 'now-playing' && '現正上映'}
                {category === 'popular' && '熱門電影'}
                {category === 'top-rated' && '最高評分'}
              </>
            </h1>
          </div>

          {/* 搜尋輸入框 */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="搜尋電影..."
              defaultValue={searchQuery}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredData?.map((movie: Movie, index: number) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
                onClick={handleMovieClick}
                onHeartClick={handleHeartClick}
                isLiked={isInWatchlist(movie.id)}
              />
            ))}
          </div>

          {/* 用於 Intersection Observer 的元素 */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="p-4 text-center">
              {isFetchingNextPage ? '載入中...' : '滾動以載入更多'}
            </div>
          )}

          {!hasNextPage && filteredData && filteredData.length > 0 && (
            <p className="mt-8 text-center text-gray-500">沒有更多電影了。</p>
          )}
        </div>
      </div>
    </ReactQueryHandler>
  );
};

export default MovieListPage;
