import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import logo from '../assets/logo.png';

export default function NavBar() {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <AppBar position="static">
            <Toolbar>
                <CardMedia
                    component="img"
                    image={logo}
                    alt='image'
                    sx={{ width: 40, mr: 1 }}
                />
                <Typography variant="h5" noWrap component="h1" sx={{ flexGrow: 1, cursor: 'default' }}>
                    socialize
                </Typography>
                <Typography variant="h5" noWrap component="h1" sx={{ cursor: 'default' }}>
                    {user?.result.name}
                </Typography>
                <Avatar variant="rounded" alt={user?.result.name} src={`https://avatars.dicebear.com/api/human/${user?.result._id}.svg`} sx={{ fontSize: '2rem', ml: 2 }}>
                    {user?.result.name.charAt(0)}
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}