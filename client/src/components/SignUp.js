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
    const [showPassword, setShowPassword] = React.useState(false);
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [helperText, setHelperText] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        showLoader();
        if (validate()) {
            dispatch(signUp(values, history))
                .finally(() => hideLoader());
            setValues({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
            setHelperText({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
            setShowPassword(false);
        }
    };
    const validate = () => {
        let temp = { ...helperText };
        for (const key in values) {
            temp[key] = values[key] === '' ? 'This field is required.' : '';
            isValid(key);
        }
        if ((values.password.length >= 8 || values.confirmPassword.length >= 8) && values.password !== values.confirmPassword) {
            temp.password = "Password didn't match.";
            temp.confirmPassword = "Password didn't match.";
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
            if ((target === 'firstName' || target === 'lastName') && !/^[a-zA-Z]{2,30}$/.test(values[target])) {
                setHelperText({ ...helperText, [target]: 'Name is not valid.' });
                return;
            }
            if ((target === 'password' || target === 'confirmPassword') && values[target].length < 8) {
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
                                onBlur={() => { isValid('firstName') }}
                                helperText={helperText.firstName}
                                error={helperText.firstName.length === 0 ? false : true}
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
                                onBlur={() => { isValid('lastName') }}
                                helperText={helperText.lastName}
                                error={helperText.lastName.length === 0 ? false : true}
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
                                onBlur={() => { isValid('email') }}
                                helperText={helperText.email}
                                error={helperText.email.length === 0 ? false : true}
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
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                helperText={helperText.password}
                                onChange={handleChange('password')}
                                onBlur={() => { isValid('password') }}
                                error={helperText.password.length === 0 ? false : true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                helperText={helperText.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                onBlur={() => { isValid('confirmPassword') }}
                                error={helperText.confirmPassword.length === 0 ? false : true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="toggle password visibility"
                                startIcon={showPassword ? <VisibilityOff /> : <Visibility />}>
                                {showPassword ? 'Hide' : 'Show'}
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