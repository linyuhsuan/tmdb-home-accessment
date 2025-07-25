export const tmdbApiConfig = {
  latestMovies: (page: number = 1) => `/movie/now_playing?page=${page}&language=zh-TW`,
  searchMovies: (query: string, page: number = 1) =>
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=zh-TW`,
  movieDetail: (movieId: number) => `/movie/${movieId}?language=zh-TW`,
  movieCredits: (movieId: number) => `/movie/${movieId}/credits?language=zh-TW`,
  movieVideos: (movieId: number) => `/movie/${movieId}/videos?language=zh-TW`,
  movieReviews: (movieId: number, page: number = 1) =>
    `/movie/${movieId}/reviews?page=${page}&language=zh-TW`,
};
