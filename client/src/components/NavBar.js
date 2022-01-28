import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

export default function NavBar() {
    const user = useSelector((state) => state.user);

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
                    {user?.name}
                </Typography>
                <Avatar variant="rounded" alt={user?.name} src={`https://avatars.dicebear.com/api/human/${user?.id}.svg`} sx={{ fontSize: '2rem', ml: 2 }}>
                    {user?.name.charAt(0)}
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}