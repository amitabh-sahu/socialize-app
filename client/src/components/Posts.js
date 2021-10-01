import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Post from './Post';

function Posts() {
    const posts = useSelector((state) => state.posts);

    return (
        <Box id="contentBox" sx={{ overflowY: 'auto', position: 'absolute', top: 0, width: '100%', height: '100%', scrollBehavior: 'smooth' }}>
            {posts.length ? (
                <Box sx={{ display: 'grid', p: 2, gap: 2 }}>
                    {posts.map((post) => (
                    <Post key={post._id} id={post._id} post={post} />
                    ))}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" noWrap component="h1">
                        There are no posts,{' '}
                        <Link to='/add' style={{ textDecoration: 'none' }}>
                            add new post
                        </Link>.
                    </Typography>
                </Box>
            )
            }
        </Box>
    );
}

export default Posts;