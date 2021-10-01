import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getPosts } from './actions/actions';
import NavBar from './components/NavBar';
import BottomBar from './components/BottomBar';
import Posts from './components/Posts';
import Form from './components/Form';
import NoMatch from './components/NoMatch';
import Box from '@mui/material/Box';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, posts]);

  return (
    <Box sx={{ height: '100vh', display: 'grid', gridTemplateRows: 'max-content auto max-content' }}>
      <Router>
        <NavBar />
        <Box sx={{ position: 'relative' }}>
          <Switch>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route path="/add">
              <Form />
            </Route>
            <Route path="/edit/:postId">
              <Form />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </Box>
        <BottomBar />
      </Router>
    </Box>
  );
}

export default App;