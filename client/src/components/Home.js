import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from "react-router-dom";
import { getPosts } from '../actions/postActions';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import BottomBar from './BottomBar';
import useLoader from '../hooks/useLoader';

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
    const dispatch = useDispatch();
    const [loader, showLoader, hideLoader] = useLoader();
    const getAllPosts = async () => {
        showLoader();
        await dispatch(getPosts());
        hideLoader();
    }

    useEffect(() => {
        getAllPosts();
    }, [dispatch]);

    return (
        <Route {...rest} render={matchProps => (
            <HomeLayout>
                {loader || <Component {...matchProps} />}
            </HomeLayout>
        )} />
    );
}

export default Home;