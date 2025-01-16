import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { searchMoviesStart } from '../../redux/slices/moviesSlice';
import { useDebounce } from '../../hooks/commonHooks';

import '../../styles/containers/MovieSearch/index.scss';

const DEFAULT_SEARCH = 'Pokemon';

const MovieSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH);
  const [year, setYear] = useState('');
  const [type, setType] = useState<'movie' | 'series' | 'episode' | ''>('');
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const { searchResults, isLoading, error, totalResults } = useAppSelector(
    state => state.movies,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedYear = useDebounce(year, 1000);

  useEffect(() => {
    dispatch(
      searchMoviesStart({
        searchTerm: debouncedSearchTerm,
        year: debouncedYear,
        type,
        currentPage,
      }),
    );
  }, [debouncedSearchTerm, debouncedYear, type, currentPage, dispatch]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as 'movie' | 'series' | 'episode' | '');
  };

  const totalPages = Math.ceil(totalResults / searchResults.length);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(
        searchMoviesStart({
          searchTerm: debouncedSearchTerm,
          year: debouncedYear,
          type,
          currentPage,
        }),
      );
    }
  };

  const handleCardClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className='container'>
      <form className='searchForm' onSubmit={handleSearch}>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchInput}
          placeholder='Search for movies...'
          className='searchInput'
        />
        <input
          type='text'
          value={year}
          onChange={handleYearInput}
          placeholder='Year (e.g., 1998)'
          className='yearInput'
        />
        <select value={type} onChange={handleTypeChange} className='typeSelect'>
          <option value=''>All Types</option>
          <option value='movie'>Movies</option>
          <option value='series'>TV Series</option>
          <option value='episode'>Episodes</option>
        </select>
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
          <div
            className='gridItem'
            key={movie.imdbID}
            onClick={() => handleCardClick(movie.imdbID)}
          >
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
