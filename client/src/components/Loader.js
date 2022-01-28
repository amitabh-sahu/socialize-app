import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import loader from '../assets/loader.svg';

function Loader() {
    return (
        <Box sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            lop: 0,
            left: 0,
            backgroundColor: '#000000ad',
        }}>
            <CardMedia
                component="img"
                image={loader}
                alt='loading'
                sx={{
                    width: 200,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: 100,
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </Box>
    )
}

export default Loader;