import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import Hero from './Hero';
import Landing from './Landing';
import useLoader from '../hooks/useLoader';
import { getMe } from '../actions/userActions';
import { isValid } from '../actions/authActions';
import { getPosts } from '../actions/postActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [loader, showLoader, hideLoader] = useLoader();

    React.useEffect(() => {
        showLoader();
        if (!auth) {
            dispatch(isValid())
                .finally(() => hideLoader());
        }
        else {
            dispatch(getMe())
                .then(() => dispatch(getPosts())
                    .finally(() => hideLoader()));
        }
    }, [auth])

    return (
        loader || <Route {...rest}>
            {auth ? (
                <Home component={Component} />
            ) : (
                <Hero component={Landing} />
            )}
        </Route>
    );
};

export default PrivateRoute;