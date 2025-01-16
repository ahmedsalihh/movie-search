import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetail, MovieDetailState } from '../types/movies';

const initialState: MovieDetailState = {
  movie: null,
  isLoading: false,
  error: null,
};

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    getMovieDetailStart: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    getMovieDetailSuccess: (
      state,
      action: PayloadAction<MovieDetail>,
    ) => {
      state.movie = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getMovieDetailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.movie = null;
    },
  },
});

export const {
  getMovieDetailStart,
  getMovieDetailSuccess,
  getMovieDetailFailure,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
