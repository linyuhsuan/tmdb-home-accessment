import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbApiRequest } from '@/shared/context/api/apiService';
import { tmdbApiConfig } from '@/shared/context/api/apiConfig';
import MovieDetail from '@/components/MovieDetail';

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 獲取電影詳情
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie-detail', id],
    queryFn: () => tmdbApiRequest(tmdbApiConfig.movieDetail(Number(id))),
    enabled: !!id,
  });

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="w-full px-4 py-8">
        <div className="py-16 text-center">
          <div className="mx-auto w-12 h-12 rounded-full border-b-2 border-blue-500 animate-spin"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="w-full px-4 py-8">
        <div className="py-16 text-center">
          <h2 className="mb-4 text-xl text-red-600">載入失敗</h2>
          <p className="mb-4 text-gray-600">無法獲取電影詳情</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return <MovieDetail movie={movie} onBack={handleBack} />;
}

export default MovieDetailPage;
