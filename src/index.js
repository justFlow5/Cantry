// import React from 'react';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {
  firebase,
  googleAuthProvider,
  login,
  logout
} from './firebase/Firebase';
import { navigate } from '@reach/router';
import AppRouter from './AppRouter';
import UserContext from './components/User-context';

import dotenv from 'dotenv';
dotenv.config();

export function initNetlifyIdentity() {
  console.log('initNetlifyIdentity called.');
  const script = document.createElement('script');

  script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
  script.async = true;

  document.body.appendChild(script);
}

export function openNetlifyModal() {
  const netlifyIdentity = window.netlifyIdentity;

  if (netlifyIdentity) netlifyIdentity.open();
  else console.log('netlifyIdentity not defined');
}

ReactDOM.render(<App />, document.getElementById('root'));
