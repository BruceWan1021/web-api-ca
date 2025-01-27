// import React from "react";
// import { createRoot } from "react-dom/client";
// import HomePage from "./pages/homePage";
// import MovieDetailsPage from './pages/movieDetailsPage';

// const images = [
//   "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
//   "/v1QQKq8M0fWxMgSdGOX1aCv8qMB.jpg",
//   "/2iGN0aKHJYD0xQydlfuCUAcgNbO.jpg",
//   "/rjBwhsOzHKUw2NIOrE7aMqjfe6s.jpg",
// ]

// const sample = {
//   adult: false,
//   backdrop_path: "/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg",
//   belongs_to_collection: {
//     id: 10,
//     name: "Star Wars Collection",
//     poster_path: "/iTQHKziZy9pAAY4hHEDCGPaOvFC.jpg",
//     backdrop_path: "/d8duYyyC9J5T825Hg7grmaabfxQ.jpg",
//   },
//   budget: 200000000,
//   genres: [
//     {
//       id: 14,
//       name: "Fantasy",
//     },
//     {
//       id: 12,
//       name: "Adventure",
//     },
//     {
//       id: 878,
//       name: "Science Fiction",
//     },
//     {
//       id: 28,
//       name: "Action",
//     },
//   ],
//   homepage:
//     "https://www.starwars.com/films/star-wars-episode-viii-the-last-jedi",
//   id: 181808,
//   imdb_id: "tt2527336",
//   original_language: "en",
//   original_title: "Star Wars: The Last Jedi",
//   overview:
//     "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
//   popularity: 44.208,
//   poster_path: "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
//   production_companies: [
//     {
//       id: 1,
//       logo_path: "/o86DbpburjxrqAzEDhXZcyE8pDb.png",
//       name: "Lucasfilm",
//       origin_country: "US",
//     },
//     {
//       id: 11092,
//       logo_path: null,
//       name: "Ram Bergman Productions",
//       origin_country: "US",
//     },
//     {
//       id: 2,
//       logo_path: "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
//       name: "Walt Disney Pictures",
//       origin_country: "US",
//     },
//   ],
//   production_countries: [
//     {
//       iso_3166_1: "US",
//       name: "United States of America",
//     },
//   ],
//   release_date: "2017-12-13",
//   revenue: 1332459537,
//   runtime: 152,
//   spoken_languages: [
//     {
//       iso_639_1: "en",
//       name: "English",
//     },
//   ],
//   status: "Released",
//   tagline: "Darkness rises... and light to meet it",
//   title: "Star Wars: The Last Jedi",
//   video: false,
//   vote_average: 7,
//   vote_count: 9692,
// };

// const movies = [sample, sample, sample, sample, sample, sample, sample];

// // const App = () => {
// //   return (
// //       <HomePage movies={movies} />
// //   );
// // };

// const App = () => {
//   return (
//       <MovieDetailsPage movie={sample} images={images} />
//       );
// };

// const rootElement = createRoot( document.getElementById("root") )
// rootElement.render(

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
// import HomePage from "./pages/homePage";
// import MoviePage from "./pages/movieDetailsPage";


// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/movies/:id" element={<MoviePage />} />
//         <Route path="/" element={<HomePage />} />
//         <Route path="*" element={ <Navigate to="/" /> } />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// const rootElement = createRoot( document.getElementById("root") )
// rootElement.render(<App />);

import React,{ useState, useEffect }  from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./context/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingPage from './pages/upcomingPage'
import NowPlayingPage from "./pages/nowPlayingPage";
import ActorDetails from "./pages/actorDetailsPage";
import LoginPage from "./pages/loginPage";
import PopularPage from "./pages/popularPage"
import WatchListPage from './pages/watchListPage'
import RegistePage from "./pages/registePage";
import AuthContextProvider from './context/authContext';

const App = () => {

  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem('sessionId') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionId);

  useEffect(() => {
    if (sessionId) {
      setIsAuthenticated(true);
    }
  }, [sessionId]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <AuthContextProvider>
        <MoviesContextProvider>
        <Routes>
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/movies/upcoming" element={ <UpcomingPage /> } />
          <Route path="/movies/nowplaying" element={ <NowPlayingPage /> } />
          <Route path="/actors/:id" element={<ActorDetails /> } />
          <Route path="/movies/popular" element={<PopularPage /> } />
          <Route path="/login" element={<LoginPage setSessionId={setSessionId} setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/movies/watchlist" element={<WatchListPage /> } />
          <Route path="/register" element={<RegistePage />} />
        </Routes>
        </MoviesContextProvider>
        </AuthContextProvider>  
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);