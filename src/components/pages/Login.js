import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import styled from 'styled-components';
import { firebase, googleAuthProvider } from '../../firebase/Firebase';
import { AuthContext } from '../Auth';

// import BgImg from '../../images/startImage.jpg';
// import BgImg from '../../images/bgImage.jpg';
import BgImg from '../../images/bgImg2.jpg';

const LoginPage = styled.div`
  position: relative;
  /* bottom: 20px; */
  width: 100vw;
  height: 100vh;
  background-image: url(${BgImg});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  /* background-size: 100% 100%; */
`;

const InputContainer = styled.div`
  position: absolute;
  right: 10%;
  top: 5%;
`;

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/dashboard');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LoginPage>
      <InputContainer>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Log in</button>
        </form>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </InputContainer>
    </LoginPage>
  );
};

export default withRouter(Login);
