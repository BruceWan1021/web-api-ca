// import React from "react";

// const FavoriteMoviesPage = () => {
//     return <h2>Favorite Movies</h2>
// }

// export default FavoriteMoviesPage

// import React from "react";
// import PageTemplate from "../components/templateMovieListPage";

// const FavoriteMoviesPage = (props) => {
//   const toDo = () => true;
//   // Get movies from local storage.
//   const movies = JSON.parse(localStorage.getItem("favorites")); 

//   return (
//     <PageTemplate
//       title="Favourite Movies"
//       movies={movies}
//       selectFavorite={toDo}
//     />
//   );
// };

// export default FavoriteMoviesPage;

import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../context/moviesContext";
import { useQueries } from "react-query";
import { getMovieDetails } from "../api/moviesAPI";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovieDetails,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;