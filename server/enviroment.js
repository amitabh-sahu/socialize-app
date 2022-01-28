import dotenv from 'dotenv';

dotenv.config();

const enviroment = ({
    port: process.env.PORT,
    origin_url: process.env.ORIGIN_URL,
    connection_url: process.env.CONNECTION_URL,
    access_secret_key: process.env.ACCESS_SECRET_KEY,
    refresh_secret_key: process.env.REFRESH_SECRET_KEY,
});

export default enviroment;