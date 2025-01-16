import { all, fork } from 'redux-saga/effects';
import { watchMovie } from './moviesSaga';
import { watchIncrementAsync } from './counterSaga';
import { watchMovieDetail } from './movieDetailSaga';

export function* rootSaga() {
  yield all([
    fork(watchMovie),
    fork(watchMovieDetail),
    fork(watchIncrementAsync),
  ]);
}
