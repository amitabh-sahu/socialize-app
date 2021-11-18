import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../constants/actionType';
import useLoader from '../hooks/useLoader';

export default function SimpleBottomNavigation() {
    const [loader, showLoader, hideLoader] = useLoader();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const gotoHome = () => {
        history.push('/');
    };
    const addPost = () => {
        history.push('/add');
    };
    const gotoTop = () => {
        document.getElementById('contentBox').scrollTop = 0;
    };
    const logOut = () => {
        showLoader();
        dispatch({ type: LOGOUT });
        history.push('/redirected');
        setUser(null);
        hideLoader();
    };
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logOut();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <Box>
            <BottomNavigation showLabels >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={gotoHome} />
                <BottomNavigationAction label="Log Out" icon={<LogoutIcon />} onClick={logOut} />
                <BottomNavigationAction label="Add Post" icon={<AddIcon />} onClick={addPost} />
                {location.pathname === "/" && <BottomNavigationAction label="Back to top" icon={<ArrowUpwardIcon />} onClick={gotoTop} />}
            </BottomNavigation>
            {loader}
        </Box>
    );
}