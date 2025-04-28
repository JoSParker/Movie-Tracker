import React from 'react';
import MovieItem from './MovieItem';
import './MovieList.css';

function MovieList({ movies, toggleFavorite, favorites, removeMovieFromWatched }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites && favorites.find((m) => m.id === movie.id)}
          removeMovieFromWatched={removeMovieFromWatched} 
        />
      ))}
    </ul>
  );
}

export default MovieList;