import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useHistory } from "react-router-dom";
import { signUp } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import useLoader from '../hooks/useLoader';

export default function SignUp() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loader, showLoader, hideLoader] = useLoader();
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = (prop) => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoader();
        await dispatch(signUp(values, history));
        hideLoader();
    };

    return loader ||  (
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                autoComplete="fname"
                                type="text"
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                autoComplete="lname"
                                type="text"
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                autoComplete="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                autoComplete="current-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleClickShowPassword}
                                aria-label="toggle password visibility"
                                startIcon={values.showPassword ? <VisibilityOff /> : <Visibility />}>
                                {values.showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ my: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                Home
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Already have an account?{' '}
                                <Link to='/signin' style={{ textDecoration: 'none' }}>
                                    Sign in
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}