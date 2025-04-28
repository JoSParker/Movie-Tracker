import React from 'react';
import MovieList from '../components/MovieList';

function Home({ favorites, toggleFavorite }) {
  return (
    <div>
      <h2>My Favorite Movies</h2>
      <MovieList movies={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
}

export default Home;