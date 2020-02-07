import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { firebase, googleAuthProvider } from './firebase/Firebase';
import { navigate } from '@reach/router';
import AppRouter from './AppRouter';
import UserContext from './components/User-context';

const App = () => {
  return <AppRouter></AppRouter>;
};

export default App;
