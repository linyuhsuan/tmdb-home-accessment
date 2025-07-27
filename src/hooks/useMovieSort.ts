import { useMemo } from 'react';
import { PopularMovie } from '../types/tmdb';

export type SortOption =
  | 'release_date.desc'
  | 'release_date.asc'
  | 'title.asc'
  | 'title.desc'
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc';

interface UseMovieSortOptions {
  movies: PopularMovie[];
  sortBy?: SortOption;
  genres?: number[];
}

export const useMovieSort = ({
  movies,
  sortBy = 'release_date.desc',
  genres = [],
}: UseMovieSortOptions) => {
  const sortedAndFilteredMovies = useMemo(() => {
    if (!movies || movies.length === 0) return [];

    // 先過濾
    let filtered = movies;
    if (genres.length > 0) {
      filtered = movies.filter(movie => {
        const hasMatchingGenre = movie.genre_ids.some(genreId => genres.includes(genreId));
        return hasMatchingGenre;
      });
    }

    // 再排序
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
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
  }, [movies, sortBy, genres]);

  return sortedAndFilteredMovies;
};
