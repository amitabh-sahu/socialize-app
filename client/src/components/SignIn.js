import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useHistory } from "react-router-dom";
import { signIn } from '../actions/authActions';
import { useDispatch } from 'react-redux';

export default function SignIn() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signIn(values, history));
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ width: 'max-content', p: 2, backgroundColor: '#ffffff', borderRadius: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        autoFocus
                    />
                    <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            required
                            fullWidth
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ my: 3 }}
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
        </Container>
    );
}