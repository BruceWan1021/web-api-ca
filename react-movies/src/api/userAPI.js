import { fetchAPI } from './apiClient';

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const addToFavorite = async (username, movieId) => {
    return await fetchAPI(`/users/${username}/favourites`, {
      method: 'POST',
      body: JSON.stringify({ movieId }),
    }, true);
  };
  
export const removeFromFavorite = async (username, movieId) => {
    return await fetchAPI(`/users/${username}/favourites`, {
      method: 'DELETE',
      body: JSON.stringify({ movieId }),
    }, true);
};
  
export const getFavorites = async (username) => {
    return await fetchAPI(`/users/${username}/favourites`, {}, true);
};

export const addToWatchlist = async (username, movieId) => {
    return await fetchAPI(`/users/${username}/watchlist`, {
      method: 'POST',
      body: JSON.stringify({ movieId }),
    }, true);
  };
  
  export const removeFromWatchlist = async (username, movieId) => {
    return await fetchAPI(`/users/${username}/watchlist`, {
      method: 'DELETE',
      body: JSON.stringify({ movieId }),
    }, true);
  };
  
  export const getWatchlist = async (username) => {
    return await fetchAPI(`/users/${username}/watchlist`, {}, true);
  };