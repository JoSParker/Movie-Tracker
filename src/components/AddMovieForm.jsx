import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

function AddMovieForm({ addMovieToWatchlist, addMovieToWatched }) {
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const apiKey = 'abd54edd21360db7f61f2d5f0d8dbc9c'; // Replace with your actual API key

  const handleInputChange = useCallback(async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    if (newTitle.trim()) {
      setLoading(true); // Set loading to true
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${newTitle}`
        );

        // Explicitly update the searchResults state with the new results
        setSearchResults((prevResults) => response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Explicitly set searchResults to an empty array in case of an error
        setSearchResults((prevResults) => []);
      } finally {
        setLoading(false); // Set loading to false
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
        placeholder="Search for a movie or TV show"
        value={title}
        onChange={handleInputChange}
      />
      {loading && <div className="loading-spinner">Loading...</div>} {/* Show loading spinner */}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((item) => (
            <li key={item.id} className="search-result-item">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                    : 'https://via.placeholder.com/92x138'
                }
                alt={item.title || item.name}
                className="search-result-poster"
              />
              <div className="search-result-details">
                {item.title || item.name} ({item.release_date ? item.release_date.substring(0, 4) : item.first_air_date ? item.first_air_date.substring(0, 4) : 'N/A'})
                <div className="search-result-buttons">
                  <button onClick={() => handleAddToWatchlist(item)}>
                    Add to Watchlist
                  </button>
                  <button onClick={() => handleAddToWatched(item)}>
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