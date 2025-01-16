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
  totalResults: number;
  isLoading: boolean;
  error: string | null;
}

export interface MovieSearchParams {
  searchTerm: string;
  currentPage: number;
}
