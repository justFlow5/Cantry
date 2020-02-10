import React, { useContext } from 'react';
import UserContext from '../User-context';

import styled from 'styled-components';

// import { login } from '../../index';
// import { login } from '../../firebase/Firebase';
// import { openNetlifyModal } from '../../index';
import { Link, navigate } from '@reach/router';
import netlifyIdentity from 'netlify-identity-widget';
// netlifyIdentity.init();

// import { login } from '../../firebase/Firebase';

// import { firebase, googleAuthProvider } from '../../firebase/Firebase';

const LoginPage = () => {
  const { handleLogin, handleLogout } = useContext(UserContext);

  // const [uid, setUid] = useState('');
  // netlifyIdentity.init();

  // const handleLogout = () => {
  //   netlifyIdentity.logout();
  // };

  // var uid;
  // const handleLogin = () => {
  //   netlifyIdentity.open();

  //   netlifyIdentity.on('login', user => {
  //     // const userrr = netlifyIdentity.currentUser();
  //     // console.log('NEWWW usser: ', userrr.id);
  //     // console.log('LOOOOGIIIIN', user.id);
  //     // setUid(user.id);
  //     uid = user.id;
  //     console.log('UUIIIDDD: ', uid);

  //     if (user.id) {
  //       console.log('uid from state', uid);
  //       navigate('/dashboard', { state: { uid } });
  //     }
  //   });
  // };

  // return <button onClick={() => login()}>LOGIN</button>;
  return (
    <>
      <button onClick={handleLogin}>LOGIN</button>;
      <button onClick={handleLogout}>LOGOUT</button>;
    </>
  );
};

export default LoginPage;
