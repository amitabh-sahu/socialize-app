import React from "react";
import { Route } from "react-router-dom";
import Home from './Home';
import Hero from './Hero';
import Landing from './Landing';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Route {...rest}>
            {user ? (
                // <Component />
                <Home component={Component} />
            ) : (
                <Hero component={Landing} />
            )}
        </Route>
    );
};

export default PrivateRoute;