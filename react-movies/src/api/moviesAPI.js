import { fetchAPI } from "./apiClient";

export const getMovies = async ({queryKey}) => {
    const[, page] = queryKey;
    return await fetchAPI(`/movies/tmdb/movies?page=${page}`)
}

export const getMovieDetails = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetchAPI(`/movies/tmdb/${id}`)
}

export const getMovieGenres = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetchAPI(`/movies/tmdb/genres/${id}`)
}

export const getUpcomingMovies =async ({queryKey}) => {
    const [, page] = queryKey;
    return await fetchAPI(`/movies/tmdb/upcoming?page=${page}`);
}

export const getPopularMovies =async ({queryKey}) => {
    const [, page] = queryKey;
    return await fetchAPI(`/movies/tmdb/popular?page=${page}`);
}

export const getNowplayingMovies =async ({queryKey}) => {
    const [, page] = queryKey;
    return await fetchAPI(`/movies/tmdb/nowPlaying?page=${page}`);
}

export const getMovieImages =async ({queryKey}) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetchAPI(`/movies/tmdb/images/${id}`);
}

export const getMovieActors =async ({queryKey}) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetchAPI(`/movies/tmdb/movieActors/${id}`);
}