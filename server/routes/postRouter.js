import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/postSchema.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ 'createdAt': 'desc' });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
});

router.post('/', auth, async (req, res) => {
    const newPost = new Post({ ...req.body, creator: req.userId });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
});

router.patch('/:id', auth, async (req, res) => {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    }
    else {
        res.status(404).send('No post found');
    }
});

router.delete('/:id', auth, async (req, res) => {
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

router.patch('/:id/:type', auth, async (req, res) => {
    const { id, type } = req.params;

    if (req.userId) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            try {
                const post = await Post.findById(id);
                const index = post[type].findIndex((id) => id === String(req.userId));
                if (index === -1) {
                    post[type].push(req.userId);
                }
                const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(404).json({ msg: err.message });
            }
        }
        else {
            res.status(404).send('No post found');
        }
    }
});

export default router;