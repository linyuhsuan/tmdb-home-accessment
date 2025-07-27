import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbApiRequest } from '@/lib/api/apiService';
import { tmdbApiConfig } from '@/lib/api/apiConfig';
import MovieDetail from '@/components/MovieDetail';
import ReactQueryHandler from '@/components/common/ReactQueryHandler';
import type { MovieDetail as MovieDetailType, Credits, Videos, Reviews } from '@/types/tmdb';

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();

  // 獲取電影詳情、演員陣容、預告片、評論
  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie-detail-all', id],
    queryFn: async () => {
      const [movie, credits, videos, reviews] = await Promise.all([
        tmdbApiRequest<MovieDetailType>(tmdbApiConfig.movieDetail(Number(id))),
        tmdbApiRequest<Credits>(tmdbApiConfig.movieCredits(Number(id))),
        tmdbApiRequest<Videos>(tmdbApiConfig.movieVideos(Number(id))),
        tmdbApiRequest<Reviews>(tmdbApiConfig.movieReviews(Number(id))),
      ]);

      return { movie, credits, videos, reviews };
    },
  });

  return (
    <ReactQueryHandler
      status={isLoading ? 'loading' : error ? 'error' : 'success'}
      error={error}
      isPending={isLoading}
      onRetry={() => window.location.reload()}
    >
      {movieData?.movie && (
        <MovieDetail
          movie={movieData.movie}
          credits={movieData.credits}
          videos={movieData.videos}
          reviews={movieData.reviews}
        />
      )}
    </ReactQueryHandler>
  );
}

export default MovieDetailPage;
