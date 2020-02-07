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
import netlifyIdentity from 'netlify-identity-widget';
dotenv.config();

netlifyIdentity.init();

ReactDOM.render(<App />, document.getElementById('root'));
