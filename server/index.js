import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from './routes/router.js';

dotenv.config();
const app = express();

const CONNECTION_URL =  process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '25mb', extended: true }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());

app.use('/posts', router);

mongoose.connect(CONNECTION_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });
}).catch((err) => {
    console.log(err.message);
});