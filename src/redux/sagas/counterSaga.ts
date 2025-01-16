import { put, takeEvery, delay } from 'redux-saga/effects';
import {
  incrementAsyncSuccess,
  incrementAsyncFailure,
} from '../slices/counterSlice';

function* incrementAsyncSaga() {
  try {
    yield delay(1000); // Simulate API call
    yield put(incrementAsyncSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(incrementAsyncFailure(error.message));
    } else {
      yield put(incrementAsyncFailure('An unknown error occurred'));
    }
  }
}

export function* watchIncrementAsync() {
  yield takeEvery('counter/incrementAsync', incrementAsyncSaga);
}
