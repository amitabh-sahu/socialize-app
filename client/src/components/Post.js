import React from 'react';
import moment from 'moment';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from './Menu';
import { useDispatch } from 'react-redux';
import { postSentiment } from '../actions/postActions';

const theme = createTheme({
    components: {
        MuiCardMedia: {
            styleOverrides: {
                img: {
                    width: 'auto',
                    maxWidth: '100%',
                },
            },
        },
    },
});

export default function Post({ post }) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <Card sx={{ display: 'grid', py: 1, gap: 1, backgroundColor: '#dddddd' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                <Avatar alt={post.name} src={`https://avatars.dicebear.com/api/human/${post.creator}.svg`} sx={{ fontSize: '2rem' }}>
                    {post.name.charAt(0).toUpperCase()}
                    </Avatar>
                <Box sx={{ ml: 1, flex: 1 }}>
                    <Typography variant="h5" component="h1">
                        {post.name}
                    </Typography>
                    <Typography variant="body1" component="p" color="text.secondary">
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </Box>
                {(user?.result._id === post.creator) && (<Menu postId={post._id} />)}
                
            </Box>
            {post.selectedFile ? (
                <ThemeProvider theme={theme}>
                    <CardMedia
                        component="img"
                        image={post.selectedFile}
                        alt={`${post.title} image`}
                    />
                </ThemeProvider>
            ) : ('')
            }
            <Box sx={{ px: 2 }}>
                <Typography variant="h5">
                    {post.title}
                </Typography>
                <Typography variant="h6" >
                    {post.message}
                </Typography>
                <Typography variant="body1" color="#2979ff">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                <IconButton aria-label="Like" onClick={() => dispatch(postSentiment(post._id, 'likes'))}>
                    <ThumbUpIcon sx={{ color: '#2979ff' }} />
                </IconButton>
                <Typography variant="body1" sx={{ p: 1 }}>
                    {post.likes.length}
                </Typography>
                <IconButton aria-label="Dislike" onClick={() => dispatch(postSentiment(post._id, 'dislikes'))}>
                    <ThumbDownIcon sx={{ color: '#2979ff' }} />
                </IconButton>
                <Typography variant="body1" sx={{ p: 1 }}>
                    {post.dislikes.length}
                </Typography>
            </Box>
        </Card>
    );
}