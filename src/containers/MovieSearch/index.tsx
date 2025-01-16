import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { searchMoviesStart } from '../../redux/slices/moviesSlice';

import '../../styles/containers/MovieSearch/index.scss';

const DEFAULT_SEARCH = 'Pokemon';

const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const { searchResults, isLoading, error, totalResults } = useAppSelector(
    state => state.movie,
  );

  useEffect(() => {
    dispatch(searchMoviesStart({ searchTerm: DEFAULT_SEARCH, currentPage: 1 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchMoviesStart({ searchTerm, currentPage }));
  }, [dispatch, currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMoviesStart({ searchTerm, currentPage }));
    }
  };

  const totalPages = Math.ceil(totalResults / searchResults.length);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='container'>
      <form className='searchForm' onSubmit={handleSearch}>
        <input
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search for movies...'
          className='searchInput'
        />
        <button type='submit' disabled={isLoading} className='searchButton'>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className='error'>{error}</p>}

      {totalResults > 0 && (
        <p className='totalResults'>Found {totalResults} results</p>
      )}

      <div className='grid'>
        {searchResults.map(movie => (
          <div className='gridItem' key={movie.imdbID}>
            <div className='title'>{movie.Title}</div>
            <div className='details'>
              <p>
                <strong>Year:</strong> {movie.Year}
              </p>
              <p>
                <strong>Type:</strong> {movie.Type}
              </p>
              <p>
                <strong>IMDB ID:</strong> {movie.imdbID}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className='pageButton'
        >
          Previous
        </button>
        <span className='pageInfo'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className='pageButton'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;
