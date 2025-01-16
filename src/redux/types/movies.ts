export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieSearchResponse {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: string;
}

export interface MovieState {
  searchResults: MovieSearchResult[];
  searchTerm: string;
  totalResults: number;
  isLoading: boolean;
  error: string | null;
}

export interface MovieSearchParams {
  searchTerm: string;
  year: string;
  type: string;
  currentPage: number;
}

export interface MovieDetailState {
  movie: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieDetailRatings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface MovieDetailRatings {
  Source: string;
  Value: string;
}
