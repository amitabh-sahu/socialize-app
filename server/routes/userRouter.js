import express from 'express';
import User from '../models/userSchema.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/getMe', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
});

export default router;