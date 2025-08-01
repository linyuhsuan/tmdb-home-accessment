import TabNavigation from '@/components/common/TabNavigation';
import { Language } from '@/lib/enum/language';
import { formatDate, formatRuntime } from '@/lib/utils/dateUtils';
import { useWatchlistStore } from '@/stores/watchlistStore';
import type { Credits, MovieDetail, Reviews, Videos } from '@/types/tmdb';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useCallback, useMemo } from 'react';

interface MovieDetailProps {
  movie: MovieDetail;
  credits?: Credits;
  videos?: Videos;
  reviews?: Reviews;
}

const MovieDetail = ({ movie, credits, videos, reviews }: MovieDetailProps) => {
  const { addWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  // Tab 配置
  const tabs = [
    { id: 'overview', label: '概覽' },
    { id: 'media', label: '媒體' },
    { id: 'fans', label: '影迷' },
  ];
  const isMovieInWatchlist = isInWatchlist(movie.id); // 檢查電影是否已在收藏清單中

  // 獲取導演
  const getDirectors = useCallback(() => {
    return credits?.crew.filter(member => member.job === 'Director') || [];
  }, [credits?.crew]);

  // 獲取編劇
  const getWriters = useCallback(() => {
    return (
      credits?.crew.filter(member => ['Writer', 'Screenplay', 'Story'].includes(member.job)) || []
    );
  }, [credits?.crew]);

  // 主演 Tab 內容
  const renderActorTab = useMemo(
    () => (
      <div className="space-y-8">
        {/* 演員陣容 */}
        {credits?.cast?.length && (
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">主演</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300">查看全部</button>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {credits.cast.slice(0, 6).map((actor, index) => (
                <div key={`${actor.id}-${index}`} className="flex-shrink-0 w-32 text-center">
                  <div className="overflow-hidden mb-3 w-32 h-40 bg-gray-300 rounded-lg">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full text-gray-500">
                        <span className="text-4xl">👤</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm">
                    <p className="mb-1 font-medium text-white">{actor.name}</p>
                    <p className="text-xs leading-tight text-gray-400">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    [credits?.cast],
  );

  // 媒體 Tab 內容
  const renderMediaTab = useMemo(
    () => (
      <div className="p-6 mb-6 bg-gray-800 rounded-lg shadow-md">
        {/* 預告片 */}
        {videos?.results?.length && (
          <div className="shadow-md p-6rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-white">預告片</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos.results
                .filter(video => video.site === 'YouTube' && video.type === 'Trailer')
                .slice(0, 6)
                .map((video, index) => (
                  <div key={`${video.id}-${index}`} className="relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      className="w-full h-48 rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <p className="mt-2 text-sm font-medium text-white">{video.name}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 劇照 */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-semibold text-white">劇照</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {movie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="object-cover w-full h-32 rounded-lg"
              />
            )}
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-cover w-full h-32 rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    ),
    [videos?.results, movie.backdrop_path, movie.poster_path, movie.title],
  );

  // 影迷 Tab 內容
  const renderFansTab = useMemo(
    () => (
      <div className="mb-6 space-y-8">
        {/* 評論 */}
        {reviews?.results?.length && (
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-white">評論</h3>
            <div className="space-y-4">
              {reviews.results.slice(0, 5).map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="pb-4 border-b border-gray-600 last:border-b-0"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-white">{review.author}</h4>
                    {review.rating && (
                      <div className="flex items-center">
                        <span className="mr-1 text-yellow-500">⭐</span>
                        <span className="text-sm text-gray-300">{review.rating}/10</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {review.content.length > 300
                      ? `${review.content.substring(0, 300)}...`
                      : review.content}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      閱讀完整評論 →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    [reviews?.results],
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="px-4 py-8 w-full">
        {/* 電影海報和基本信息 */}
        <div className="overflow-hidden mb-8 bg-gray-800 rounded-lg shadow-md">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
            {movie.backdrop_path && (
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r to-transparent from-gray-900/80 via-gray-800/60"></div>

            {/* 內容區域 */}
            <div className="flex absolute inset-0 flex-col justify-center px-4 sm:px-6 md:px-8 lg:flex-row lg:items-center">
              {/* 電影海報 */}
              <div className="flex justify-center mb-4 lg:mb-0 lg:flex-shrink-0">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-32 h-48 rounded-lg shadow-2xl sm:w-40 sm:h-60 md:w-48 md:h-72"
                  />
                )}
              </div>

              {/* 電影信息 */}
              <div className="flex-1 text-white lg:ml-8">
                {/* 電影標題 */}
                <h1 className="mb-2 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
                  {movie.title} ({new Date(movie.release_date).getFullYear()})
                </h1>

                {/* 電影詳情 */}
                <p className="mb-4 text-xs sm:mb-6 sm:text-sm">
                  {formatDate(movie.release_date)} {formatRuntime(movie.runtime)}{' '}
                  {movie.genres?.map(g => g.name).join(', ')}
                </p>

                {/* 評分和按鈕 */}
                <div className="flex flex-wrap gap-2 mb-4 sm:gap-3 md:gap-4 sm:mb-6">
                  <div className="flex items-center p-3 space-x-1 bg-gray-700 rounded-full transition-colors sm:p-3 sm:space-x-2 hover:bg-gray-600">
                    <div className="flex justify-center items-center w-6 h-6 text-xs font-bold text-yellow-500 bg-gray-800 rounded-full border border-yellow-500 sm:w-8 sm:h-8 sm:text-sm">
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <span className="text-xs text-white sm:text-sm">用戶評分</span>
                  </div>

                  <div
                    onClick={() =>
                      isMovieInWatchlist ? removeFromWatchlist(movie.id) : addWatchlist(movie)
                    }
                    className={`flex items-center p-2 sm:p-3 space-x-1 sm:space-x-2 rounded-full transition-colors ${
                      isMovieInWatchlist
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {isMovieInWatchlist ? (
                      <HeartSolid className="w-4 h-4 text-red-500 sm:w-5 sm:h-5" />
                    ) : (
                      <HeartOutline className="w-4 h-4 text-white sm:w-5 sm:h-5" />
                    )}
                    <span className="text-xs text-white sm:text-sm">
                      {isMovieInWatchlist ? '已收藏' : '收藏'}
                    </span>
                  </div>

                  <div className="flex items-center p-2 space-x-1 bg-gray-700 rounded-full transition-colors sm:p-3 sm:space-x-2 hover:bg-gray-600">
                    <span className="text-xs text-white sm:text-sm">▶</span>
                    <span className="text-xs text-white sm:text-sm">播放預告片</span>
                  </div>
                </div>

                {/* 概覽 */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="mb-1 text-sm font-medium text-gray-300 sm:mb-2 sm:text-base">
                    概覽
                  </h4>
                  <p className="text-xs text-gray-400 sm:text-sm md:text-base line-clamp-3 sm:line-clamp-none">
                    {movie.overview}
                  </p>
                </div>

                {/* 導演和編劇 */}
                <div className="flex flex-col gap-3 w-full sm:gap-4 lg:flex-row">
                  {getDirectors().length > 0 && (
                    <div className="flex-1">
                      <h4 className="mb-1 text-sm font-medium text-gray-300 sm:mb-2 sm:text-base">
                        導演
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {getDirectors().map((director, index) => (
                          <span
                            key={`${director.id}-${director.job}`}
                            className="text-xs text-white sm:text-sm"
                          >
                            {director.name}
                            {index < getDirectors().length - 1 ? '、' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 編劇 */}
                  {getWriters().length > 0 && (
                    <div className="flex-1">
                      <h4 className="mb-1 text-sm font-medium text-gray-300 sm:mb-2 sm:text-base">
                        編劇
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {getWriters()
                          .slice(0, 3)
                          .map((writer, index) => (
                            <span
                              key={`${writer.id}-${writer.job}`}
                              className="text-xs text-white sm:text-sm"
                            >
                              {writer.name}
                              {index < Math.min(getWriters().length, 3) - 1 ? '、' : ''}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 電影詳細資訊和 Tab 區塊 */}
        <div className="flex flex-col gap-6 mb-6 lg:flex-row">
          {/* Tab 導航和內容 */}
          <div className="w-full lg:w-3/5">
            <TabNavigation tabs={tabs} defaultTab="overview">
              {activeTab => (
                <div>
                  {activeTab === 'overview' && (
                    <>
                      {renderActorTab}
                      {renderMediaTab}
                      {renderFansTab}
                    </>
                  )}
                  {activeTab === 'media' && renderMediaTab}
                  {activeTab === 'fans' && renderFansTab}
                </div>
              )}
            </TabNavigation>
          </div>
          {/* 電影詳細資訊 */}
          <div className="p-6 w-full bg-gray-800 rounded-lg shadow-md lg:w-2/5">
            <h3 className="mb-4 text-xl font-bold text-white">電影詳細資訊</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="mb-2 font-medium text-blue-400">原始標題</h4>
                <p className="text-white">{movie.original_title}</p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-blue-400">狀態</h4>
                <p className="text-white">
                  {movie.status === 'Released' ? '已發佈' : movie.status}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-blue-400">原始語言</h4>
                <p className="text-white">
                  {Language[movie.original_language.toUpperCase() as keyof typeof Language] ||
                    movie.original_language}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-blue-400">電影成本</h4>
                <p className="text-white">
                  {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : '未知'}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-blue-400">收入</h4>
                <p className="text-white">
                  {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : '未知'}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-blue-400">製作公司</h4>
                <p className="text-white">
                  {movie.production_companies?.map(company => company.name).join(', ') || '未知'}
                </p>
              </div>
            </div>

            {/* 關鍵字 */}
            <div className="mt-6">
              <h4 className="mb-3 font-medium text-blue-400">關鍵字</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  superhero
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  based on comic
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  family
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  alternative reality
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  marvel cinematic universe (mcu)
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  1960s
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  retrofuturism
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg">
                  galactus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
