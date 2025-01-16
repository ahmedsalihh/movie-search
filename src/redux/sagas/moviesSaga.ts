import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMovies } from '../../api/movieApi';
import {
  searchMoviesSuccess,
  searchMoviesFailure,
} from '../slices/moviesSlice';
import { MovieSearchParams, MovieSearchResponse } from '../types/movies';
import { PayloadAction } from '@reduxjs/toolkit';

function* searchMoviesSaga(action: PayloadAction<MovieSearchParams>) {
  try {
    const response: MovieSearchResponse = yield call(
      fetchMovies,
      action.payload,
    );
    yield put(
      searchMoviesSuccess({
        results: response.Search,
        totalResults: parseInt(response.totalResults, 10),
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(searchMoviesFailure(error.message));
    } else {
      yield put(searchMoviesFailure('An unknown error occurred'));
    }
  }
}

export function* watchMovie() {
  yield takeLatest('movies/searchMoviesStart', searchMoviesSaga);
}
