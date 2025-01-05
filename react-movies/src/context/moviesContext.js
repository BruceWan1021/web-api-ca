import React, { useState, useEffect } from "react";
import { getFavorites } from '../api/userAPI';
import { addToFavorite } from '../api/userAPI';
import { removeFromFavorite } from "../api/userAPI";
import { addReviews } from '../api/moviesAPI';
import { addToWatchlist } from "../api/userAPI";
import { getWatchlist } from "../api/userAPI";
import { removeFromWatchlist } from "../api/userAPI";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )

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
    setMyReviews( {...myReviews, [review.movieId]: review } )
    console.log(review);
    addReviews(review.movieId, review.author, review.review, review.rating)
      .then((response) => {
        console.log("Review successfully submitted:", response);
      })
      .catch((error) => {
        console.error("Error adding review:", error.message);
      });
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
      addToWatchlist(username, movie.id);
    }
  };
  
  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const data = await getWatchlist(username);
        const movieIds = data.map(movie => movie.id);
        setMustWatch(movieIds);
      } catch (error) {
        console.error("Error fetching watchlistmovies:", error);
      }
    };
    fetchWatchlistMovies();
  }, []);

    const removeFromPlaylist = (movie) => {
      setMustWatch( mustWatch.filter(
        (mId) => mId !== movie.id
      ) )
      removeFromWatchlist(username, movie.id)
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
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;