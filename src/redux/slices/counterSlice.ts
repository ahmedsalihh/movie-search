import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterState } from '../types/counter';

const initialState: CounterState = {
  value: 0,
  isLoading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementAsync: state => {
      state.isLoading = true;
    },
    incrementAsyncSuccess: state => {
      state.value += 1;
      state.isLoading = false;
    },
    incrementAsyncFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementAsync,
  incrementAsyncSuccess,
  incrementAsyncFailure,
} = counterSlice.actions;
export default counterSlice.reducer;
