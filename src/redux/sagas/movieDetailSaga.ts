import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { fetchMovieDetail } from '../../api/movieApi';
import { MovieDetail } from '../types/movies';
import {
  getMovieDetailSuccess,
  getMovieDetailFailure,
} from '../slices/movieDetailSlice';

function* getMovieDetailSaga(action: PayloadAction<string>) {
  try {
    const response: MovieDetail = yield call(fetchMovieDetail, action.payload);
    yield put(getMovieDetailSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getMovieDetailFailure(error.message));
    } else {
      yield put(getMovieDetailFailure('An unknown error occurred'));
    }
  }
}

export function* watchMovieDetail() {
  yield takeLatest('movieDetail/getMovieDetailStart', getMovieDetailSaga);
}
