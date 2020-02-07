import React from 'react';

import styled from 'styled-components';
import { Link } from '@reach/router';
// import { login } from '../../index';
import { login } from '../../firebase/Firebase';
import { openNetlifyModal } from '../../index';

// import { login } from '../../firebase/Firebase';

// import { firebase, googleAuthProvider } from '../../firebase/Firebase';

const LoginPage = () => {
  // return <button onClick={() => login()}>LOGIN</button>;
  return <button onClick={() => openNetlifyModal()}>LOGIN</button>;
};

export default LoginPage;
