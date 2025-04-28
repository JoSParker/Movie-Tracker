import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

function AddMovieForm({ addMovieToWatchlist, addMovieToWatched }) {
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = 'abd54edd21360db7f61f2d5f0d8dbc9c'; // Replace with your actual API key

  const handleInputChange = useCallback(async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (newTitle.trim()) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newTitle}`
        );

        // Explicitly update the searchResults state with the new results
        setSearchResults((prevResults) => response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Explicitly set searchResults to an empty array in case of an error
        setSearchResults((prevResults) => []);
      }
    } else {
      // Explicitly set searchResults to an empty array when the input is empty
      setSearchResults((prevResults) => []);
    }
  }, [apiKey]);

  const handleAddToWatchlist = (movie) => {
    addMovieToWatchlist(movie);
    setTitle('');
    setSearchResults([]);
  };

  const handleAddToWatched = (movie) => {
    addMovieToWatched(movie);
    setTitle('');
    setSearchResults([]);
  };

  return (
    <div className="add-movie-form">
      <input
        type="text"
        placeholder="Search for a movie"
        value={title}
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((movie) => (
            <li key={movie.id} className="search-result-item">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : 'https://via.placeholder.com/92x138'
                }
                alt={movie.title}
                className="search-result-poster"
              />
              <div className="search-result-details">
                {movie.title} ({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})
                <div className="search-result-buttons">
                  <button onClick={() => handleAddToWatchlist(movie)}>
                    Add to Watchlist
                  </button>
                  <button onClick={() => handleAddToWatched(movie)}>
                    Add to Watched
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddMovieForm;