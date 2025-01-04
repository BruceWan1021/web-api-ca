import { fetchAPI } from "./apiClient";

export const getMovies = async ({queryKey}) => {
    const[, page] = queryKey;
    return await fetchAPI(`/movies?page=${page}`)
}

export const getUpcomingMovies =async ({queryKey}) => {
    const [, page] = queryKey;
    return await fetchAPI(`/movies/tmdb/upcoming?page=${page}`);
}

