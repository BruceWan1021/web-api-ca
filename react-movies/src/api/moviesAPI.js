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

export const getGenres = async () => {
    return await fetchAPI(`/movies/tmdb/genres`)
}

export const getUpcomingMovies =async ({queryKey}) => {
    const [, page] = queryKey;
    return await fetchAPI(`/movies/tmdb/upcoming?page=${page}`);
}

export const getPopularMovie =async ({queryKey}) => {
    const [, page] = queryKey;
    return await fetchAPI(`/movies/tmdb/popular?page=${page}`);
}

export const getNowplaying =async ({queryKey}) => {
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

export const getActorDetails =async ({queryKey}) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetchAPI(`/movies/tmdb/actors/${id}`);
}

export const getActorCredits = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetchAPI(`/movies/tmdb/actors/credits/${id}`);
}