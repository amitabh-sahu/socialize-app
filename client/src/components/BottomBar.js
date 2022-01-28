import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import useLoader from '../hooks/useLoader';

export default function SimpleBottomNavigation() {
    const [loader, showLoader, hideLoader] = useLoader();
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
        dispatch(logout(history))
            .finally(() => hideLoader());
    };

    return (
        <Box>
            <BottomNavigation showLabels >
                <BottomNavigationAction label="Log Out" icon={<LogoutIcon />} onClick={logOut} />
                {location.pathname !== "/" && <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={gotoHome} />}
                {location.pathname !== "/add" && <BottomNavigationAction label="Add Post" icon={<AddIcon />} onClick={addPost} />}
                {location.pathname === "/" && <BottomNavigationAction label="Back to top" icon={<ArrowUpwardIcon />} onClick={gotoTop} />}
            </BottomNavigation>
            {loader}
        </Box>
    );
}