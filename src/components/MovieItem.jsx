import React from 'react';
import './MovieItem.css';
import { useLocation } from 'react-router-dom';

function MovieItem({ movie, children, toggleFavorite, isFavorite, removeMovieFromWatched }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
    : 'https://via.placeholder.com/185x278'; // Placeholder image

  const heartIcon = isFavorite ? '❤️' : '🤍'; // Filled heart if favorite, empty heart otherwise
  const location = useLocation(); // Get the current location

  const title = movie.title || movie.name; // Use movie.title for movies and movie.name for TV shows
  const year = movie.release_date ? movie.release_date.substring(0, 4) : movie.first_air_date ? movie.first_air_date.substring(0, 4) : 'N/A'; // Handle both release_date and first_air_date

  return (
    <li className="movie-item">
      <img src={imageUrl} alt={title} className="movie-poster" />
      <div className="movie-title">{title}</div>
      <div className="movie-year">({year})</div>
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