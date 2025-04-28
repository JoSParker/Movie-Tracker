import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Watchlist from './pages/Watchlist';
import Watched from './pages/Watched';
import AddMovieForm from './components/AddMovieForm';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Home from './pages/Home'; // Import the Home component

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  const [watched, setWatched] = useState(() => {
    const storedWatched = localStorage.getItem('watched');
    return storedWatched ? JSON.parse(storedWatched) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    localStorage.setItem('watched', JSON.stringify(watched));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [watchlist, watched, favorites]);

  const addMovieToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]); // Use movie object
    }
  };

  const addMovieToWatched = (movie) => {
    if (!watched.find((m) => m.id === movie.id)) {
      setWatched([...watched, movie]); // Use movie object
    }
  };

  const toggleFavorite = (movie) => {
    if (favorites.find((m) => m.id === movie.id)) {
      // Remove from favorites
      setFavorites(favorites.filter((m) => m.id !== movie.id));
    } else {
      // Add to favorites
      setFavorites([...favorites, movie]); // Use movie object
    }
  };

  const moveMovieToWatched = (id) => {
    const movieToMove = watchlist.find((movie) => movie.id === id);
    if (movieToMove) {
      // Check if the movie is already in watched
      if (!watched.find((m) => m.id === movieToMove.id)) {
        setWatched([...watched, movieToMove]);
        setWatchlist(watchlist.filter((movie) => movie.id !== id));
      }
    }
  };

  const removeMovieFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  const removeMovieFromWatched = (id) => {
    setWatched(watched.filter((movie) => movie.id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <Link to="/" className="header-link">
            <h1>Movie Tracker</h1>
          </Link>
          <nav>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/watched">Watched</Link>
          </nav>
        </header>
        <div className="app-body">
          <AddMovieForm
            addMovieToWatchlist={addMovieToWatchlist}
            addMovieToWatched={addMovieToWatched}
          />
          <Routes>
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  moveMovieToWatched={moveMovieToWatched}
                  removeMovieFromWatchlist={removeMovieFromWatchlist}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              }
            />
            <Route
              path="/watched"
              element={
                <Watched
                  watched={watched}
                  removeMovieFromWatched={removeMovieFromWatched}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;