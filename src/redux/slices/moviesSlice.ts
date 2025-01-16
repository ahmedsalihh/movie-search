import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieState, MovieSearchResult, MovieSearchParams } from '../types/movies';

const initialState: MovieState = {
  searchResults: [],
  totalResults: 0,
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    searchMoviesStart: (state, action: PayloadAction<MovieSearchParams>) => {
      state.isLoading = true;
      state.error = null;
    },
    searchMoviesSuccess: (
      state,
      action: PayloadAction<{
        results: MovieSearchResult[];
        totalResults: number;
      }>,
    ) => {
      state.searchResults = action.payload.results;
      state.totalResults = action.payload.totalResults;
      state.isLoading = false;
      state.error = null;
    },
    searchMoviesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.searchResults = [];
      state.totalResults = 0;
    },
  },
});

export const { searchMoviesStart, searchMoviesSuccess, searchMoviesFailure } =
  movieSlice.actions;

export default movieSlice.reducer;
