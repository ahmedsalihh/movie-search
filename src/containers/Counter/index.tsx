import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  increment,
  decrement,
  incrementAsync,
} from '../../redux/slices/counterSlice';

const Counter: React.FC = () => {
  const count = useAppSelector(state => state.counter.value);
  const isLoading = useAppSelector(state => state.counter.isLoading);
  const error = useAppSelector(state => state.counter.error);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementAsync())} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Increment Async'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Counter;
