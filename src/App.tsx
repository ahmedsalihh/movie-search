import React from 'react';
import MovieSearch from './containers/MovieSearch';
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './containers/MovieDetail';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MovieSearch />} />
        <Route path="/movie/:imdbId" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default App;
