import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class SignIn extends Component { 
  constructor(props) {
    super(props);
  }

  onSubmit = () => {

  }
  
  onChange = () => {

  }

  render() {
    return (
      <div>
        <h1>SignIn</h1>
        <form>
          <input></input>
        </form>
        <SignUpLink />
      </div>
    );
  }
};

const SignUpLink = () => (
  <p>Have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
);

export default SignIn;