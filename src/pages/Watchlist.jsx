import React from 'react';
import MovieItem from '../components/MovieItem';
import './Watchlist.css';
import MovieList from '../components/MovieList';

function Watchlist({ watchlist, moveMovieToWatched, removeMovieFromWatchlist, toggleFavorite, favorites }) {
  return (
    <div className="watchlist">
      <h2>Watchlist</h2>
      <MovieList movies={watchlist} toggleFavorite={toggleFavorite} favorites={favorites} />
    </div>
  );
}

export default Watchlist;