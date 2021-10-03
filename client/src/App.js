import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import Hero from './components/Hero';
import Posts from './components/Posts';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Form from './components/Form';
import NoMatch from './components/NoMatch';
import Redirected from './components/Redirected';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PrivateRoute component={Posts} />
        </Route>
        <Route exact path="/signin">
          <Hero component={SignIn} />
        </Route>
        <Route exact path="/signup">
          <Hero component={SignUp} />
        </Route>
        <Route exact path="/add">
          <PrivateRoute component={Form} />
        </Route>
        <Route exact path="/edit/:postId">
          <PrivateRoute component={Form} />
        </Route>
        <Route exact path="/redirected">
          <Hero component={Redirected} />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;