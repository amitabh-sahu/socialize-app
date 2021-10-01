import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/shema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({'createdAt': 'desc'});
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
});

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new : true });
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    }
    else {
        res.status(404).send('No post found');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            await Post.findByIdAndDelete(id);
            res.status(200).json({ msg: 'post deleted successfully' });
        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    }
    else {
        res.status(404).send('No post found');
    }
});

router.patch('/:id/:type', async (req, res) => {
    const { id, type } = req.params;
    
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const post = await Post.findById(id);
            const sentiment = {
                'like': {likeCount: post.likeCount + 1},
                'dislike': {dislikeCount: post.dislikeCount + 1}
            };
            const updatedPost = await Post.findByIdAndUpdate(id, sentiment[type], { new : true });
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    }
    else {
        res.status(404).send('No post found');
    }
});

export default router;