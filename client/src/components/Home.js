import React from 'react';
import { Route } from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import BottomBar from './BottomBar';

const HomeLayout = ({ children }) => (
    <Box sx={{ height: '100vh', display: 'grid', gridTemplateRows: 'max-content auto max-content' }}>
        <NavBar />
        <Box sx={{ position: 'relative' }}>
            {children}
        </Box>
        <BottomBar />
    </Box>
);

function Home({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={matchProps => (
            <HomeLayout>
                <Component {...matchProps} />
            </HomeLayout>
        )} />
    );
}

export default Home;