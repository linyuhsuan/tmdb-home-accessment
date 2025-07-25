export const tmdbApiConfig = {
  latestMovies: (page: number = 1) => `/movie/now_playing?page=${page}&language=zh-TW`,
  searchMovies: (query: string, page: number = 1) =>
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=zh-TW`,
  movieDetail: (movieId: number) => `/movie/${movieId}?language=zh-TW`,
};
