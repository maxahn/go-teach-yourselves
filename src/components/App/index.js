import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route,
 } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      let newAuthUser = authUser ? authUser : null; 
      this.setState({authUser: newAuthUser});
    });
  }

  componentWillUnmount() {
    this.listener();
  }
  
  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser}/>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          {
            this.state.authUser && (
              <div>
                <Route exact path={ROUTES.HOME} component={HomePage} />
                <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
              </div>
            )
          }
        </div>
      </Router>
    );
  };
};

export default withFirebase(App);
