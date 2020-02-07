import React, { useState } from 'react';

import styled from 'styled-components';

// import { login } from '../../index';
// import { login } from '../../firebase/Firebase';
// import { openNetlifyModal } from '../../index';
import { Link, navigate } from '@reach/router';
import netlifyIdentity from 'netlify-identity-widget';
netlifyIdentity.init();

// import { login } from '../../firebase/Firebase';

// import { firebase, googleAuthProvider } from '../../firebase/Firebase';

const LoginPage = () => {
  const [uid, setUid] = useState('');
  const handleClick = () => {
    netlifyIdentity.open();
    // netlifyIdentity.on('init', user => console.log('init', user));
    // navigate('/dashboard');
  };

  // return <button onClick={() => login()}>LOGIN</button>;
  return <button onClick={handleClick}>LOGIN</button>;
};

export default LoginPage;
