import React from 'react';
import { Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Background from './Background';

const HeroLayout = ({ children }) => (
    <Box sx={{ height: '100vh', position: 'relative' }}>
        <Background />
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            {children}
        </Box>
    </Box>
);

function Hero({component: Component, ...rest}) {
    return (
        <Route {...rest} render={matchProps => (
            <HeroLayout>
                <Component {...matchProps} />
            </HeroLayout>
        )} />
    );
}

export default Hero;