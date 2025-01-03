import express from 'express';
import favouritesModel from './favouritesModel'; 
import asyncHandler from 'express-async-handler';

const router = express.Router(); 

router.post('/:userId/favourite', asyncHandler(async (req, res) => {
    const { userId } = req.params; 
    const { movieId } = req.body; 

    if (!userId || !movieId) {
        return res.status(400).json({ success: false, msg: 'UserId and MovieId are required.' });
    }

    await favouritesModel.create({ userId, movieId });

    res.status(201).json({ success: true, msg: 'Favourite successfully added.' });
}));

export default router;
