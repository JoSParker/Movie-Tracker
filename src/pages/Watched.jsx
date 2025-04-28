import React from 'react';
import MovieItem from '../components/MovieItem';
import './Watched.css';
import MovieList from '../components/MovieList';

function Watched({ watched, removeMovieFromWatched, toggleFavorite, favorites }) {
  return (
    <div className="watched">
      <h2>Watched Movies</h2>
      <MovieList
        movies={watched}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
        removeMovieFromWatched={removeMovieFromWatched} // Pass removeMovieFromWatched
      />
    </div>
  );
}

export default Watched;