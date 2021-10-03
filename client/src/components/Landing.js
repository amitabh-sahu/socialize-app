import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material//Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material//Typography';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

function Landing() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <CardMedia
                component="img"
                image={logo}
                alt='image'
                sx={{ width: 150 }}
            />
            <Typography
                color="#ffffff"
                variant="h4"
                align="center"
                sx={{ my: 4 }}
            >
                Post whats on your mind with the world.
            </Typography>
            <Link to='/signin' style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="large" sx={{ fontSize: '1rem', minWidth: 200 }} >
                    Sing In
                </Button>
            </Link>
            <Typography variant="h6" color="#ffffff" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                    Sign Up
                </Link>
            </Typography>
        </Box>
    );
}

export default Landing;