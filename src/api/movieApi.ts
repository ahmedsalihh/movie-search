import {
  MovieDetail,
  MovieSearchParams,
  MovieSearchResponse,
} from '../redux/types/movies';

const API_KEY = '7b03d5a1';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (
  params: MovieSearchParams,
): Promise<MovieSearchResponse> => {
  const response = await fetch(
    `${BASE_URL}?s=${params.searchTerm}&page=${params.currentPage}&apikey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const data = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'No movies found');
  }

  return data;
};

export const fetchMovieDetail = async (
  imdbId: string,
): Promise<MovieDetail> => {
  const response = await fetch(`${BASE_URL}?i=${imdbId}&apikey=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const data = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'No movies found');
  }

  return data;
};
