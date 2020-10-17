import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
};

class SignInBase extends Component { 
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  };

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase.doSignInWithEmailAndPassword(email, password).then(authUser => {
      this.setState(INITIAL_STATE);
      this.props.history.push(ROUTES.HOME);
    }).catch(error => {
      this.setState({ error });
    });
    event.preventDefault();
  };
  
  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  };

  render() {
    const { email, password, error}  = this.state; 
    const isInvalid = email === '' || password === ''; 
    return (
      <div>
        <h1>SignIn</h1>
        <form onSubmit={this.onSubmit}>
          <input 
            name='email'
            value={email}
            onChange={this.onChange}
            type='text'
            placeholder='Email'
          />
          <input 
            name='password'
            value={password}
            onChange={this.onChange}
            type='password'
            placeholder='Password'
          />
          <button type='submit' disabled={isInvalid}>Login</button>
        </form>
        {error && <p>{error.message}</p>}
        <SignUpLink />
      </div>
    );
  }
};

const SignInPage = withRouter(withFirebase(SignInBase));

export default SignInPage;