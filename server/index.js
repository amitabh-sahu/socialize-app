import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRouter.js';
import authRoutes from './routes/authRouter.js';
import userRoutes from './routes/userRouter.js';
import enviroment from "./enviroment.js";

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const ORIGIN_URL = isProduction ? enviroment.origin_url : 'http://localhost:3000';
const CONNECTION_URL = enviroment.connection_url;
const PORT = enviroment.port || 5000;

app.use(express.json({ limit: '25mb', extended: true }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors({ credentials: true, origin: ORIGIN_URL }));
app.use(cookieParser());

app.use('/post', postRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('socialize-app API');
});

mongoose.connect(CONNECTION_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});