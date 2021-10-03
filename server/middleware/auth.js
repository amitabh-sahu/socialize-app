import jwt from "jsonwebtoken";
import enviroment from "../enviroment.js";

const SECRET_KEY = enviroment.secret_key;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (token) {
            const decodedData = jwt.verify(token, SECRET_KEY);
            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;