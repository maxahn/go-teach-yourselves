import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route,
 } from 'react-router-dom';
// import { withAuthentication } from '../Session';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';

const App = (props) => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      {
        props.authUser && (<div>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        </div>)
      }
    </div>
  </Router>
);

export default withAuthentication(App);
