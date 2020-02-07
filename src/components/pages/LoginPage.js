import React, { useState } from 'react';

import styled from 'styled-components';
import { Link } from '@reach/router';
// import { login } from '../../index';
// import { login } from '../../firebase/Firebase';
// import { openNetlifyModal } from '../../index';
import { navigate } from '@reach/router';
import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init();
// import { login } from '../../firebase/Firebase';

// import { firebase, googleAuthProvider } from '../../firebase/Firebase';

const LoginPage = () => {
  const [uid, setUid] = useState('');
  const handleClick = () => {
    netlifyIdentity.open('login');
    netlifyIdentity.on('login', user => {
      console.log('WELCOME: ', user.id);
      if (user) {
        // setUid(user.id);

        navigate('/dashboard');
      }
    });
  };

  const user = netlifyIdentity.currentUser();
  // return <button onClick={() => login()}>LOGIN</button>;
  return <button onClick={handleClick}>LOGIN</button>;
};

export default LoginPage;
