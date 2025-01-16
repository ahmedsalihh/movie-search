import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getMovieDetailStart } from '../../redux/slices/movieDetailSlice';
import { MovieDetailRatings } from '../../redux/types/movies';

const MovieDetail: React.FC = () => {
  const { imdbId } = useParams();

  const dispatch = useAppDispatch();
  const { movie, isLoading, error } = useAppSelector(
    state => state.movieDetail,
  );

  useEffect(() => {
    if (imdbId) {
      dispatch(getMovieDetailStart(imdbId));
    }
  }, [dispatch, imdbId]);

  return (
    <div className='container'>
      {isLoading ? 'Loading...' : ''}
      {error && <p className='error'>{error}</p>}
      {movie && (
        <div className='movie-details'>
          <h1 className='title'>{movie.Title}</h1>
          <img src={movie.Poster} alt={movie.Title} className='poster' />
          <div className='info'>
            <p>
              <strong>Year:</strong> {movie.Year}
            </p>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Language:</strong> {movie.Language}
            </p>
            <p>
              <strong>Country:</strong> {movie.Country}
            </p>
            <p>
              <strong>Awards:</strong> {movie.Awards}
            </p>
            <div className='ratings'>
              <strong>Ratings:</strong>
              <ul>
                {movie.Ratings?.map(
                  (rating: MovieDetailRatings, index: number) => (
                    <li key={index}>
                      {rating.Source}: {rating.Value}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <p>
              <strong>IMDB Rating:</strong> {movie.imdbRating} (
              {movie.imdbVotes} votes)
            </p>
            <p>
              <strong>Box Office:</strong> {movie.BoxOffice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
