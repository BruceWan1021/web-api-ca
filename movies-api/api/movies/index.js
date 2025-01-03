import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import Review from './reviewModel';
import { getUpcomingMovies } from '../tmdb-api';
import { getMovieGenres } from '../tmdb-api';
import { getPopularMovie } from '../tmdb-api';
import { getNowPlayingMovie } from '../tmdb-api';
import { getMovieReviews } from '../tmdb-api';
import { getMovieImages } from '../tmdb-api'

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

//Get movies genres
router.get('/tmdb/genres/:movie_id', asyncHandler(async (req, res) => {
    const { movie_id } = req.params;
    const movieGenres = await getMovieGenres(movie_id);
    res.status(200).json(movieGenres);
}));

//Get popular movies
router.get('/tmdb/popular', asyncHandler(async (req, res) =>{
    const popularMovies = await getPopularMovie();
    res.status(200).json(popularMovies);
}));

//Get nowplaying movies
router.get('/tmdb/nowPlaying', asyncHandler(async (req, res) =>{
    const popularMovies = await getNowPlayingMovie();
    res.status(200).json(popularMovies);
}));

//Get movie images
router.get('/tmdb/images/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const movieGenres = await getMovieImages(movie_id);
    res.status(200).json(movieGenres);
}));

//Get movie reviews
router.get('/tmdb/reviews/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const movieGenres = await getMovieReviews(movie_id);
    res.status(200).json(movieGenres);
}));

//Add movie reviews
router.post('/:movieId/review', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const { userId, content } = req.body;
    
    if(!userId || !content) {
        return res.status(400).json({ success: false, msg: 'UserId and Content are required.'})
    };
    const existingReview = await Review.findOne({userId, movieId});
    if(existingReview) {
        return res.status(409).json({ success: false, msg: 'You have already reviewed this movie.'})
    }
    const addReview = await Review.create({userId, movieId, content});

    res.status(201).json({success: true, msg: 'Review successfully added.'})
}))

export default router;
