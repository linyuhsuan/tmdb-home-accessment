import { useCallback } from 'react';
import type { MovieDetail, Credits, Videos, Reviews } from '@/types/tmdb';
import PersonCard from '@/components/common/PersonCard';
import BackButton from '@/components/common/BackButton';

interface MovieDetailProps {
  movie: MovieDetail;
  credits?: Credits;
  videos?: Videos;
  reviews?: Reviews;
  onBack: () => void;
}

const MovieDetail = ({ movie, credits, videos, reviews, onBack }: MovieDetailProps) => {
  // 演員陣容渲染函數
  const renderCastSection = useCallback(() => {
    if (!credits?.cast?.length) return null;

    return (
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">演員陣容</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {credits.cast.slice(0, 12).map(actor => (
              <PersonCard
                key={actor.id}
                id={actor.id}
                name={actor.name}
                profilePath={actor.profile_path}
                role={actor.character}
                size="md"
                layout="vertical"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }, [credits?.cast]);

  // 預告片渲染函數
  const renderVideosSection = useCallback(() => {
    const trailerVideos = videos?.results.filter(
      video => video.site === 'YouTube' && video.type === 'Trailer',
    );

    return (
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">預告片</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trailerVideos?.slice(0, 6).map(video => (
              <div key={video.id} className="relative">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  className="w-full h-48 rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <p className="mt-2 text-sm font-medium">{video.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [videos?.results]);

  // 導演和工作人員渲染函數
  const renderCrewSection = useCallback(() => {
    const filteredCrew = credits?.crew.filter(member =>
      ['Director', 'Producer', 'Writer', 'Screenplay'].includes(member.job),
    );
    return (
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">導演和工作人員</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCrew?.slice(0, 9).map((member, index) => (
              <PersonCard
                key={`${member.id}-${member.job}-${index}`}
                id={member.id}
                name={member.name}
                profilePath={member.profile_path}
                role={member.job}
                size="sm"
                layout="horizontal"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }, [credits?.crew]);

  // 評論渲染函數
  const renderReviewsSection = useCallback(() => {
    return (
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">評論</h3>
          <div className="space-y-4">
            {reviews?.results.slice(0, 5).map(review => (
              <div key={review.id} className="review-item">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{review.author}</h4>
                  {review.rating && (
                    <div className="flex items-center">
                      <span className="mr-1 text-yellow-500">⭐</span>
                      <span className="text-sm">{review.rating}/10</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">
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
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    閱讀完整評論 →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [reviews?.results]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按鈕 */}
      <BackButton onClick={onBack} btnText="返回列表" />

      <div className="px-4 py-8 w-full">
        {/* 電影標題和基本資訊 */}
        <div className="mb-8 bg-white rounded-lg shadow-md">
          <div className="relative h-64">
            {movie.backdrop_path && (
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
              <h1 className="mb-2 text-3xl font-bold">{movie.title}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-yellow-500">⭐ {movie.vote_average.toFixed(1)}</span>
                <span>{movie.release_date}</span>
                <span>{movie.runtime} 分鐘</span>
              </div>
            </div>
          </div>
        </div>
        {/* 演員陣容 */}
        {credits?.cast?.length ? renderCastSection() : null}
        {/* 預告片 */}
        {videos?.results?.length ? renderVideosSection() : null}
        {/* 導演和工作人員 */}
        {credits?.crew?.length ? renderCrewSection() : null}
        {/* 評論 */}
        {reviews?.results?.length ? renderReviewsSection() : null}
      </div>
    </div>
  );
};

export default MovieDetail;
