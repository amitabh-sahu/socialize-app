import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


function noMatch() {
    return (
        <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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