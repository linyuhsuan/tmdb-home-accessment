// TMDB List 相關型別
export interface TMDBList {
  id: number;
  name: string;
  description: string;
  poster_path: string | null;
  backdrop_path: string | null;
  created_by?: {
    avatar_path: string | null;
    gravatar_hash: string;
    id: string;
    name: string;
    username: string;
  };
  results: PopularMovie[];
  item_count: number;
  average_rating?: number;
  revenue?: number;
  runtime?: number;
  sort_by?: string;
  total_pages?: number;
  total_results?: number;
  comments?: Record<string, string | null>;
}

export interface PopularMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
}

// 電影詳情型別
export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  adult: boolean;
  original_language: string;
  spoken_languages: SpokenLanguage[];
  production_countries: ProductionCountry[];
  belongs_to_collection: BelongsToCollection | null;
  imdb_id: string | null;
  homepage: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// 演員陣容型別
export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

// 預告片型別
export interface Videos {
  id: number;
  results: Video[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

// 評論型別
export interface Reviews {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
  rating: number | null;
}

// 電影/電視劇清單回應型別
export interface MediaListResponse {
  page: number;
  results: PopularMovie[];
  total_pages: number;
  total_results: number;
}

// API 回應型別
export interface TMDBResponse<T> {
  success: boolean;
  results: T;
  status_code: number;
  status_message: string;
}
