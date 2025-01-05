const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchAPI = async (endpoint, options = {}, requiresAuth = false) => {
    const url = `${BASE_URL}${endpoint}`;
    console.log('Request URL:', url);
    const token = window.sessionStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(requiresAuth && token ? {Authorization: token } : {}),
        ...options.headers,
    };
    try{
        const response = await fetch(url, {
            ...options, headers,
        });
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }catch (error) {
        console.error('Error in fetchAPI:', error.message);
        throw error;
    }
}