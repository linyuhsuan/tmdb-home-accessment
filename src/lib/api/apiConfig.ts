export const tmdbApiConfig = {
  latestMovies: (page: number = 1) =>
    `/movie/now_playing?page=${page}&language=zh-TW&include_adult=false`,
  popularMovies: (page: number = 1) =>
    `/movie/popular?page=${page}&language=zh-TW&include_adult=false`,
  topRatedMovies: (page: number = 1) =>
    `/movie/top_rated?page=${page}&language=zh-TW&include_adult=false`,
  searchMovies: (query: string, page: number = 1) =>
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=zh-TW&include_adult=false`,
  movieDetail: (movieId: number) => `/movie/${movieId}?language=zh-TW`,
  movieCredits: (movieId: number) => `/movie/${movieId}/credits?language=zh-TW`,
  movieVideos: (movieId: number) => `/movie/${movieId}/videos?language=zh-TW`,
  movieReviews: (movieId: number, page: number = 1) =>
    `/movie/${movieId}/reviews?page=${page}&language=zh-TW`,
  movieGenres: () => `/genre/movie/list?language=zh-TW`,
};
