import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams, useHistory } from "react-router-dom";
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, updatePost } from '../actions/postActions';
import useLoader from '../hooks/useLoader';

export default function MultilineTextFields() {
    const history = useHistory();
    const { postId } = useParams();
    const dispatch = useDispatch();
    const [loader, showLoader, hideLoader] = useLoader();
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => postId ? state.posts.find((each) => each._id === postId) : null);
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
        else {
            setPostData({ title: '', message: '', tags: '', selectedFile: '' });
        }
    }, [post]);

    const saveNote = () => {
        showLoader();
        if (postId) {
            dispatch(updatePost(postId, { ...postData, name: user?.result?.name }));
        }
        else {
            dispatch(addPost({ ...postData, name: user?.result?.name }));
        }
        hideLoader();
        history.push('/');
    };

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { my: 1, width: '100%' }, p: 3 }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h5" sx={{ mb: 1 }}>
                {postId ? ('Edit post') : ('Add new post')}
            </Typography>
            <TextField id="title" label="Title" multiline value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
            <TextField id="message" label="Message" multiline rows={5} value={postData.message} onChange={e => setPostData({ ...postData, message: e.target.value })} />
            <TextField id="tags" label="Tags" multiline value={postData.tags} onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            <Typography variant="subtitle2" color="text.secondary">
                Type all tags saprated by coma.
            </Typography>
            <Box sx={{ my: 1 }}>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            </Box>
            <Button variant="contained" onClick={saveNote} sx={{ mr: 1, my: 1 }}>Save</Button>
            {loader}
        </Box>
    );
}