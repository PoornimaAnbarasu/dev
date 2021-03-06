import React, { Fragment, useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import Alert from './components/layouts/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from "./utils/setAuthToken"

import { authorizeUser } from './redux/auth/authActions';

if (localStorage.token) {
  setAuthToken(localStorage.token)
};

const App = () => {

  useEffect(() => {
    store.dispatch(authorizeUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
