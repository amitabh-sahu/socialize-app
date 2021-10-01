import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useHistory } from "react-router-dom";

export default function SimpleBottomNavigation() {
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

    return (
        <Box>
            <BottomNavigation showLabels >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={gotoHome} />
                <BottomNavigationAction label="Add Post" icon={<AddIcon />} onClick={addPost} />
                <BottomNavigationAction label="Back to top" icon={<ArrowUpwardIcon />} onClick={gotoTop} />
            </BottomNavigation>
        </Box>
    );
}