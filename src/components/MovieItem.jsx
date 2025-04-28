import React from 'react';
import './MovieItem.css';
import { useLocation } from 'react-router-dom';

function MovieItem({ movie, children, toggleFavorite, isFavorite, removeMovieFromWatched }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
    : 'https://via.placeholder.com/185x278'; // Placeholder image

  const heartIcon = isFavorite ? '❤️' : '🤍'; // Filled heart if favorite, empty heart otherwise
  const location = useLocation(); // Get the current location

  return (
    <li className="movie-item">
      <img src={imageUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-title">{movie.title}</div>
      <div className="movie-year">({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</div>
      {location.pathname !== '/' && ( // Conditionally render the button
        <button
          className="favorite-button"
          onClick={() => toggleFavorite(movie)}
        >
          {heartIcon}
        </button>
      )}
      {location.pathname === '/watched' && ( // Conditionally render the delete button
        <button
          className="delete-button"
          onClick={() => removeMovieFromWatched(movie.id)}
        >
          Delete
        </button>
      )}
      {children}
    </li>
  );
}

export default MovieItem;