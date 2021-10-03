import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';
import enviroment from "../enviroment.js";

const router = express.Router();
const SECRET_KEY = enviroment.secret_key;

router.post('/singin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            const isPassMatch = await bcrypt.compare(password, userExist.password);
            if (isPassMatch) {
                const token = jwt.sign({ email: userExist.email, id: userExist._id }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ result: userExist, token });
            }
            else {
                res.status(404).json({ msg: 'Invalid Credentials' });
            }
        }
        else {
            res.status(404).json({ msg: 'Invalid Credentials' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post('/singup', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({ msg: 'This email is already exist' });
        }
        else {
            if (password === confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });
                const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ result: newUser, token });
            }
            else {
                res.status(400).json({ msg: "Password didn't match" });
            }
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

export default router;