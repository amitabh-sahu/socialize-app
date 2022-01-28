import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';
import RefreshTokens from '../models/tokenSchema.js';
import enviroment from "../enviroment.js";
import auth from '../middleware/auth.js';

const router = express.Router();
const ACCESS_SECRET_KEY = enviroment.access_secret_key;
const REFRESH_SECRET_KEY = enviroment.refresh_secret_key;

const capitalize = (str) => str && str[0].toUpperCase() + str.slice(1).toLowerCase();
const isProduction = process.env.NODE_ENV === 'production';

const cookieOption = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
    expires: new Date(Date.now() + (24 * 3600 * 1000)),
};

router.post('/singin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            const isPassMatch = await bcrypt.compare(password, userExist.password);
            if (isPassMatch) {
                const accessToken = getAccessToken({ id: userExist._id });
                const refreshToken = getRefreshToken({ id: userExist._id });
                await RefreshTokens.create({ refreshToken });
                res.status(200)
                    .cookie('refreshToken', refreshToken, cookieOption)
                    .json({ accessToken });
            }
            else {
                res.status(401).json({ msg: 'Invalid Credentials' });
            }
        }
        else {
            res.status(401).json({ msg: 'Invalid Credentials' });
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
                const newUser = await User.create({ name: `${capitalize(firstName)} ${capitalize(lastName)}`, email, password: hashedPassword });
                const accessToken = getAccessToken({ id: newUser._id });
                const refreshToken = getRefreshToken({ id: newUser._id });
                await RefreshTokens.create({ refreshToken });
                res.status(200)
                    .cookie('refreshToken', refreshToken, cookieOption)
                    .json({ accessToken });
            }
            else {
                res.status(400).json({ msg: "Password didn't match" });
            }
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.get('/guest', async (req, res) => {
    try {
        const guestUser = await User.findOne({ _id: '61960fd7bbbead5163283fae' });
        const accessToken = getAccessToken({ id: guestUser._id });
        const refreshToken = getRefreshToken({ id: guestUser._id });
        await RefreshTokens.create({ refreshToken });
        res.status(200)
            .cookie('refreshToken', refreshToken, cookieOption)
            .json({ accessToken });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.get('/isValid', auth, (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.get('/refresh', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken == null) {
            return res.sendStatus(401);
        }
        if (!(await RefreshTokens.findOne({ refreshToken }))) {
            return res.sendStatus(401);
        }
        jwt.verify(refreshToken, REFRESH_SECRET_KEY, async (err, user) => {
            if (err) {
                await RefreshTokens.deleteMany();
                return res.sendStatus(403);
            }
            if (((user.exp * 1000) - new Date().getTime()) < (3600 * 1000)) {
                const newRefreshToken = getRefreshToken({ id: user.id });
                await RefreshTokens.findOneAndDelete({ refreshToken });
                await RefreshTokens.create({ refreshToken: newRefreshToken });
                res.cookie('refreshToken', newRefreshToken, cookieOption)
            }
            const accessToken = getAccessToken({ id: user.id });
            res.status(200).json({ accessToken });
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.delete('/logout', auth, async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        await RefreshTokens.findOneAndDelete({ refreshToken });
        res.status(204).clearCookie('refreshToken', cookieOption).json({ msg: 'Cookie Cleared' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

function getAccessToken(data) {
    return jwt.sign(data, ACCESS_SECRET_KEY, { expiresIn: '10s' });
}

function getRefreshToken(data) {
    return jwt.sign(data, REFRESH_SECRET_KEY, { expiresIn: '15s' });
}

export default router;