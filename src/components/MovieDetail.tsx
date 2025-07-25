import type { MovieDetail as MovieDetailType } from '@/types/tmdb';

interface MovieDetailProps {
  movie: MovieDetailType;
  onBack: () => void;
}

const MovieDetail = ({ movie, onBack }: MovieDetailProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按鈕 */}
      <div className="bg-white border-b shadow-sm">
        <div className="w-full px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回列表
          </button>
        </div>
      </div>

      <div className="w-full px-4 py-8">
        {/* 電影基本資訊 */}
        <div className="overflow-hidden mb-8 bg-white rounded-lg shadow-md">
          <div className="relative h-96">
            {movie.backdrop_path && (
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                srcSet={`https://image.tmdb.org/t/p/w780${movie.backdrop_path} 1x, https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 2x, https://image.tmdb.org/t/p/original${movie.backdrop_path} 3x`}
                alt={movie.title}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
              <h1 className="mb-2 text-4xl font-bold">{movie.title}</h1>
              <p className="text-lg opacity-90">{movie.original_title}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* 海報 */}
              <div className="lg:col-span-1">
                {movie.poster_path && (
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    srcSet={`https://image.tmdb.org/t/p/w342${movie.poster_path} 1x, https://image.tmdb.org/t/p/w500${movie.poster_path} 2x, https://image.tmdb.org/t/p/w780${movie.poster_path} 3x`}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* 詳細資訊 */}
              <div className="lg:col-span-2">
                {/* 標語 */}
                {movie.tagline && (
                  <p className="mb-4 text-lg italic text-gray-600">"{movie.tagline}"</p>
                )}

                {/* 評分和投票 */}
                <div className="flex items-center mb-4 space-x-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl text-yellow-500">⭐</span>
                    <span className="text-xl font-semibold">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500">({movie.vote_count.toLocaleString()} 票)</span>
                  <span className="text-gray-500">{movie.release_date}</span>
                </div>

                {/* 劇情簡介 */}
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold">劇情簡介</h3>
                  <p className="leading-relaxed text-gray-700">{movie.overview}</p>
                </div>

                {/* 電影資訊網格 */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* 基本資訊 */}
                  <div className="space-y-3">
                    <h3 className="pb-2 text-lg font-semibold border-b">基本資訊</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">片長:</span>
                        <span>{movie.runtime} 分鐘</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">狀態:</span>
                        <span>{movie.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">原始語言:</span>
                        <span>{movie.original_language.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">成人內容:</span>
                        <span>{movie.adult ? '是' : '否'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 財務資訊 */}
                  <div className="space-y-3">
                    <h3 className="pb-2 text-lg font-semibold border-b">財務資訊</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">預算:</span>
                        <span>${movie.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">票房:</span>
                        <span>${movie.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">人氣度:</span>
                        <span>{movie.popularity.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 類型 */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-lg font-semibold">類型</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map(genre => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 製作公司 */}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-lg font-semibold">製作公司</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {movie.production_companies.map(company => (
                        <div key={company.id} className="text-center">
                          {company.logo_path ? (
                            <img
                              loading="lazy"
                              src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                              srcSet={`https://image.tmdb.org/t/p/w92${company.logo_path} 1x, https://image.tmdb.org/t/p/w200${company.logo_path} 2x`}
                              alt={company.name}
                              className="object-contain mx-auto mb-2 h-12"
                            />
                          ) : (
                            <div className="flex justify-center items-center mb-2 h-12 bg-gray-200 rounded">
                              <span className="text-xs text-gray-500">無標誌</span>
                            </div>
                          )}
                          <p className="text-sm font-medium">{company.name}</p>
                          {company.origin_country && (
                            <p className="text-xs text-gray-500">{company.origin_country}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 外部連結 */}
                <div className="pt-6 mt-6 border-t">
                  <h3 className="mb-3 text-lg font-semibold">外部連結</h3>
                  <div className="flex space-x-4">
                    {movie.homepage && (
                      <a
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        官方網站 →
                      </a>
                    )}
                    {movie.imdb_id && (
                      <a
                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        IMDb →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
