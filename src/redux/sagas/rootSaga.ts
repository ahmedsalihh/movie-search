import { all, fork } from 'redux-saga/effects';
import { watchMovie } from './movieSaga';
import { watchIncrementAsync } from './counterSaga';

export function* rootSaga() {
  yield all([
    fork(watchMovie),
    fork(watchIncrementAsync),
  ]);
}
