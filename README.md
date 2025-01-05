# Assignment 2 - Web API.

Name: Zhenyang Wan

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

 + add to favourite 
 + get favourite list
 + delete from favourite
 + add to watchlist
 + get watchlist
 + delete from watchlist
 + add review 
 + fully integrate api in web-api
 + Login and register authentication

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

react-movies : here the REACT_APP_API_URL is important, to fetchAPI address

```.env
REACT_APP_TMDB_KEY=040f98bcccc39b0127307ad91a668e07

FAST_REFRESH=false

REACT_APP_API_URL=http://localhost:8080/api
```

______________________
NODE_ENV=development

PORT=8080

HOST=localhost

MONGO_DB=mongodb+srv://ZhenyangWan:2pEtGieylavGkHAl@cluster0.l6tfe.mongodb.net/?retryWrites=true&w=majority&appName=tasky

TMDB_KEY=040f98bcccc39b0127307ad91a668e07

SECRET=ilikecake

______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/tmdb/movies | GET | Gets a list of movies from tmdb  
- /api/tmdb/upcoming | GET | Gets a list of upcoming movies from tmdb  
- /api/tmdb/genres | GET | Gets a list of genres from tmdb  
- /api/tmdb/popular | GET | Gets a list of popular movies from tmdb  
- /api/tmdb/nowplaying| GET | Gets a list of nowplaying movies from tmdb  
- /api/tmdb/images/{movieId} | GET | Gets an image of movie  
- /api/tmdb/{movieid} | GET | Gets movie details
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 
- /api/users/{username}/favourites | GET | Get all favorite movie for user
- /api/users/{username}/favourites | Delete | Delete favorite movie for user
- /api/users/{username}/favourites | Post | Create favorite movie for user
- /api/users/{username}/watchlist | GET | Get watchlist  movie for user
- /api/users/{username}/watchlist | Delete | Delete watchlist  movie for user
- /api/users/{username}/watchlist  | Post | Create watchlist  movie for user



## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

When the user login, the api use JWT authentication to generate a token to store in Sessionstorage. 

- /api/users
- /api/users/{username}/favourites | GET | Get all favorite movie for user
- /api/users/{username}/favourites | Delete | Delete favorite movie for user
- /api/users/{username}/favourites | Post | Create favorite movie for user
- /api/users/{username}/watchlist | GET | Get watchlist  movie for user
- /api/users/{username}/watchlist | Delete | Delete watchlist  movie for user
- /api/users/{username}/watchlist  | Post | Create watchlist  movie for user

all the routes under users are protected.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

I create user, favourite, watchlist, review,movie database and write the api of those database in post, get, delete. And in assignment one, I use third authentication, but here I use JWT token to do it and add login page and register page Also use authcontext to do authentication.

![](../web-api-ca/image.png)

In react movies, I use a fetchAPI function in apiClient. and those api relating to movies in movieAPI and those api relating to users in userAPI. And the tmdb-api will not be used again.

## Independent learning (if relevant)

