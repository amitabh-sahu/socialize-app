import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" noWrap component="h1" sx={{ flexGrow: 1 }}>
                    APP
                </Typography>
                <Avatar variant="rounded" />
            </Toolbar>
        </AppBar>
    );
}