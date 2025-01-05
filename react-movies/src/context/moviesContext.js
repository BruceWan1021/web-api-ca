import React, { useState, useEffect } from "react";
import { getFavorites } from '../api/userAPI';
import { addToFavorite } from '../api/userAPI';
import { removeFromFavorite } from "../api/userAPI";
import { getWatchlistMovies } from '../api/tmdb-api';

import { toggleWatchlist } from '../api/tmdb-api';
import { addRating} from '../api/tmdb-api'

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )
  const [rating, setRating] = useState( [] ) 

  const username = sessionStorage.getItem("username");

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    setFavorites(newFavorites);
    addToFavorite(username, movie.id);
  };

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const data = await getFavorites(username);
        const movieIds = data.map(movie => movie.movieId);
        setFavorites(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, []);

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
    removeFromFavorite(username, movie.id)
  };

  const addToPlaylist = (movie) => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
      toggleWatchlist(sessionId, movie.id, true)
        .catch((error) => console.error("Error adding to watchlist:", error));
    }
  };
  

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    const fetchWatchlistMovies = async () => {
      try {
        const data = await getWatchlistMovies(sessionId);
        const movieIds = data.results.map(movie => movie.id);
        setMustWatch(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchWatchlistMovies();
  }, []);

    const removeFromPlaylist = (movie) => {
      const sessionId = sessionStorage.getItem("sessionId");
      setMustWatch( mustWatch.filter(
        (mId) => mId !== movie.id
      ) )
      toggleWatchlist(sessionId, movie.id, false)
        .catch((error) => console.error("Error removing from watchlist:", error))
    };

  const addToRating = (movie, rating) => {
    const sessionId = sessionStorage.getItem("sessionId");
    setRating( {...rating, [movie.id]: rating} )
    addRating(sessionId, movie.id, rating)
    .catch((error) => console.error("Error adding to favourites:", error));
  }; 

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToPlaylist,
        removeFromPlaylist,
        addToRating,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;