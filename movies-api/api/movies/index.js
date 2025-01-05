import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import Review from './reviewModel';
import { getActorCredits } from '../tmdb-api';
import { getUpcomingMovies } from '../tmdb-api';
import { getMovieGenres } from '../tmdb-api';
import { getPopularMovie } from '../tmdb-api';
import { getNowPlayingMovie } from '../tmdb-api';
import { getMovieReviews } from '../tmdb-api';
import { getMovieImages } from '../tmdb-api';
import { getMovieActors } from '../tmdb-api';
import { getActorDetail } from '../tmdb-api';
import {getMovies} from '../tmdb-api';
import {getMovieDetail} from '../tmdb-api';

const router = express.Router();

// router.get('/', asyncHandler(async (req, res) => {
//     let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
//     [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

//     // Parallel execution of counting movies and getting movies using movieModel
//     const [total_results, results] = await Promise.all([
//         movieModel.estimatedDocumentCount(),
//         movieModel.find().limit(limit).skip((page - 1) * limit)
//     ]);
//     const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

//     //construct return Object and insert into response object
//     const returnObject = {
//         page,
//         total_pages,
//         total_results,
//         results
//     };
//     res.status(200).json(returnObject);
// }));

//Get movies
router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    const movies = await getMovies();
    res.status(200).json(movies);
}));

//Get upcoming movies
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

//Get movies genres
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const movieGenres = await getMovieGenres();
    res.status(200).json(movieGenres);
}));

// Get movie details
router.get('/tmdb/:movieId', asyncHandler(async (req, res) => {
    const {movieId} = req.params;
    const movieDetails = await getMovieDetail(movieId);
    res.status(200).json(movieDetails);
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
    const movieGenres = await getMovieImages(movieId);
    res.status(200).json(movieGenres);
}));

//Get movie reviews
router.get('/tmdb/reviews/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const movieGenres = await getMovieReviews(movieId);
    res.status(200).json(movieGenres);
}));

// Add movie reviews
router.post('/:movieId/review', asyncHandler(async (req, res) => {
    const { movieId } = req.params; 
    const { author, review, rating } = req.body;

    if (!author || !review || rating == null) {
        return res.status(400).json({ success: false, msg: 'Author, Review, and Rating are required.' });
    }

    const existingReview = await Review.findOne({ author, movieId });
    if (existingReview) {
        return res.status(409).json({ success: false, msg: 'You have already reviewed this movie.' });
    }

    const newReview = await Review.create({ author, movieId, review, rating });
    res.status(201).json({success: true, msg: 'Review successfully added.'});
}));

//Delete movie review
router.delete('/:movieId/review/:reviewId',asyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const existingReview = await Review.findById(reviewId);
    if(!existingReview) {
        return res.status(404).json({ success: false, msg: 'Review not found.' });
    }
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ success: true, msg: 'Review successfully delete.'});
}))

//Get movie actors
router.get('/tmdb/movieActors/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const movieActors = await getMovieActors(movieId);
    res.status(200).json(movieActors);
}));

//Get actor details
router.get('/tmdb/actors/:actorId', asyncHandler(async (req, res) => {
    const { actorId } = req.params;
    const actorDetail = await getActorDetail(actorId);
    res.status(200).json(actorDetail);
}));

//Get actor credits
router.get('/tmdb/actors/credits/:actorId', asyncHandler(async (req, res) => {
    const { actorId } = req.params;
    const creditsDetail = await getActorCredits(actorId);
    res.status(200).json(creditsDetail);
}));

export default router;
