import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Favourite from './favouritesModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

async function registerUser(req, res) {
    // Add input validation logic here
    const { username, password } = req.body;
    if (!validatePassword(password)) {
        return res.status(400).json({
            success: false,
            msg:'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
        });
    } 
    await User.create(username, password);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

//Post favourite movies
router.post('/:userId/favourite', asyncHandler(async (req, res) => {
    const { userId } = req.params; 
    const { movieId } = req.body; 

    if (!userId || !movieId) {
        return res.status(400).json({ success: false, msg: 'UserId and MovieId are required.' });
    }
    const existingFavourite = await Favourite.findOne({ userId, movieId });
    if(existingFavourite) {
        return res.status(401).json({ success: false, msg: 'It has already been in favourite list.'})
    }

    await Favourite.create({ userId, movieId });
    res.status(201).json({ success: true, msg: 'Favourite successfully added.' });
}));

//Get all favourites
router.get('/:userId/favourites', asyncHandler(async (req, res) => {
    const favourites = await Favourite.find(req.params);
    res.status(200).json(favourites);
}))

//Delete the favourite movie
router.delete('/:userId/favourite', asyncHandler(async (req, res) => {
    const { userId } = req.params; 
    const { movieId } = req.body;

    if (!userId || !movieId) {
        return res.status(400).json({ success: false, msg: 'UserId and MovieId are required.' });
    }
    const existingFavourite = await Favourite.findOne({ userId, movieId });
    if (!existingFavourite) {
        return res.status(404).json({ success: false, msg: 'Favourite not found.' });
    }
    await Favourite.findOneAndDelete({ userId, movieId });
    res.status(200).json({ success: true, msg: 'Favourite successfully deleted.' });
}))


export default router;
