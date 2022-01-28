import jwt from "jsonwebtoken";
import enviroment from "../enviroment.js";

const ACCESS_SECRET_KEY = enviroment.access_secret_key;

const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, ACCESS_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.userId = user.id;
        next();
    });
}

export default auth;