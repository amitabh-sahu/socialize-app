import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material//Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material//Typography';
import { Link, useHistory } from "react-router-dom";
import logo from '../assets/logo.png';
import { signIn } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import useLoader from '../hooks/useLoader';

function Landing() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loader, showLoader, hideLoader] = useLoader();
    const guest = {
        email: 'guest@socialize.com',
        password: 'guestlogin',
    };
    const handleGuestLogin = async () => {
        showLoader();
        await dispatch(signIn(guest, history));
        hideLoader();
        history.push('/redirected');
    };

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
                sx={{ my: 2 }}
            >
                Post whats on your mind with the world.
            </Typography>
            <Link to='/signin' style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="large" sx={{ fontSize: '1rem', minWidth: 200 }} >
                    Sing In
                </Button>
            </Link>
            <Button variant="contained" size="large" onClick={handleGuestLogin} sx={{ fontSize: '1rem', minWidth: 200, my: 1 }} >
                Visit as Guest
            </Button>
            <Typography variant="h6" color="#ffffff">
                Don't have an account?{' '}
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                    Sign Up
                </Link>
            </Typography>
            {loader}
        </Box>
    );
}

export default Landing;