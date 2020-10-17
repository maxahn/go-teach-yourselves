import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({firebase, history}) => (
  <button type='button' onClick={eh => {
    firebase.doSignOut().then(() => {
      history.push(ROUTES.LANDING);
    }).catch(error => {
      // TODO: Error handling
    });
  }}>
    Sign Out
  </button>
); 

export default withRouter(withFirebase(SignOutButton));