import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import notFound from '../assets/notFound.png';

function noMatch() {
    return (
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
                component="img"
                image={notFound}
                alt='image'
                sx={{ width: 150 }}
            />
            <Typography component="h1" variant="h1">
                404
            </Typography>
            <Typography component="h1" variant="h4">
                Page not found
            </Typography>
            <Link to='/' style={{ fontSize: '1.2rem', textDecoration: 'none' }}>
                go to home
            </Link>
        </Box>
    );
}

export default noMatch;