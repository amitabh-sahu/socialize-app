import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from './routes/postRouter.js';
import userRoutes from './routes/userRouter.js';
import enviroment from "./enviroment.js";

const app = express();

const CONNECTION_URL =  enviroment.connection_url;
const PORT = enviroment.port || 5000;

app.use(express.json({ limit: '25mb', extended: true }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

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