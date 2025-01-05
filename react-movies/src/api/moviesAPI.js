import { methods } from "uview-ui/libs/mixin/mixin";
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

export const getReviews = async (movieId) => {
    return await fetchAPI(`/movies/tmdb/reviews/${movieId}`);
};

export const addReviews = async (movieId, author, review, rating) => {
    try {
        const response = await fetchAPI(`/movies/${movieId}/review`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author, 
                movieId,
                review,  
                rating   
            }),
        });
        return response;
    } catch (error) {
        console.error("Error adding review:", error.message);
        throw error;
    }
};
