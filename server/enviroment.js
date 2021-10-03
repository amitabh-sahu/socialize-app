import dotenv from 'dotenv';

dotenv.config();

const enviroment = ({
    port: process.env.PORT,
    connection_url: process.env.CONNECTION_URL,
    secret_key: process.env.SECRET_KEY,
});

export default enviroment;