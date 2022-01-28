import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useHistory } from "react-router-dom";
import { signIn } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import useLoader from '../hooks/useLoader';

export default function SignIn() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loader, showLoader, hideLoader] = useLoader();
    const [showPassword, setShowPassword] = React.useState(false);
    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });
    const [helperText, setHelperText] = React.useState({
        email: '',
        password: '',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        showLoader();
        if (validate()) {
            dispatch(signIn(values, history))
                .finally(() => hideLoader());
            setValues({ email: '', password: '' });
            setHelperText({ email: '', password: '' });
            setShowPassword(false);
        }
    };
    const validate = () => {
        let temp = { ...helperText };
        for (const key in values) {
            temp[key] = values[key] === '' ? 'This field is required.' : '';
            isValid(key);
        }
        setHelperText({ ...temp });
        return Object.values(temp).every((x) => x === '');
    };
    const isValid = (target) => {
        if (values[target] !== '') {
            const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (target === 'email' && !emailReg.test(values.email)) {
                setHelperText({ ...helperText, [target]: 'Email is not valid.' });
                return;
            }
            if (target === 'password' && values.password.length < 8) {
                setHelperText({ ...helperText, [target]: 'Password is too short.' });
                return;
            }
            setHelperText({ ...helperText, [target]: '' });
        }
    };

    return loader || (
        <Container component="main" maxWidth="xs" sx={{ maxWidth: 'max-content', p: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    borderRadius: 1,
                    p: 2,
                }}
            >
                <Avatar variant="rounded" sx={{ m: 1, backgroundColor: '#ba000d' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={() => { isValid('email') }}
                        helperText={helperText.email}
                        error={helperText.email.length === 0 ? false : true}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        helperText={helperText.password}
                        onChange={handleChange('password')}
                        onBlur={() => { isValid('password') }}
                        error={helperText.password.length === 0 ? false : true}
                        InputProps={{
                            endAdornment: (
                                < InputAdornment position="end" >
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ my: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                Home
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Don't have an account?{' '}
                                <Link to='/signup' style={{ textDecoration: 'none' }}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
}