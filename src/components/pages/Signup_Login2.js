import React, { useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import styled, { keyframes } from 'styled-components';

import { firebase, googleAuthProvider } from '../../firebase/Firebase';
import { AuthContext } from '../Auth';
import BgImg from '../../images/bgImg2.jpg';

const overshadowing_dx = keyframes`
0%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
		box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
	}
	100%{
		z-index: 1;
		transform: perspective(100px) translate3d(100px, 0px, -30px);
		opacity: 0.5;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
	} 
`;

const overshadowing_sx = keyframes`
	0%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
		box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
	}
	100%{
		z-index: 1;
		transform: perspective(100px) translate3d(-100px, 0px, -30px);
		opacity: 0.5;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
	}
`;

const foregrounding_dx = keyframes`
0%{
		z-index:1;
		transform: perspective(100px) translate3d(100px, 0px, -30px);
		opacity: 0.5;
	}
	50%{
		z-index:2;
		transform: perspective(100px) translate3d(400px, 0px, -30px);
	}
	100%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
	}
`;

const foregrounding_sx = keyframes`
0%{
		z-index:1;
		transform: perspective(100px) translate3d(-100px, 0px, -30px);
		opacity: 0.5;
	}
	50%{
		z-index:2;
		transform: perspective(100px) translate3d(-400px, 0px, -30px);
	}
	100%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
	}
`;

const LoginPage = styled.div`
  position: relative;
  /* bottom: 20px; */
  /* width: 100vw;
  height: 100vh; */
  width: 100%;
  height: 100%;
  /* position: fixed; */
  background-image: url(${BgImg});
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  background-position: center;
  background-size: cover;

  /* background-size: 100% 100%; */
`;

const Form = styled.form`
  position: absolute;
  right: 25%;
  top: 5%;
  text-align: center;
  background: #fff;
  width: 310px;
  height: 470px;
  border-radius: 5px;
  padding: 30px 20px 0 20px;
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  & > h3 {
    font-family: 'Dosis';
    font-size: 35px;
    text-transform: uppercase;
    color: #353839;
    margin-bottom: 30px;
  }

  &.signIn {
    z-index: 1;
    transform: perspective(100px) translate3d(100px, 0px, -30px);
    opacity: 0.5;

    &.active-dx {
      animation-name: ${foregrounding_sx};
      animation-duration: 0.9s;
      animation-fill-mode: forwards;
    }
    &.inactive-dx {
      animation-name: ${overshadowing_sx};
      animation-duration: 0.9s;
      animation-fill-mode: forwards;
    }

    & input {
      width: 100%;
    }
  }

  &.signUp {
    z-index: 2;

    &.active-sx {
      animation-name: ${foregrounding_dx};
      animation-duration: 0.9s;
      animation-fill-mode: forwards;
    }
    &.inactive-sx {
      animation-name: ${overshadowing_dx};
      animation-duration: 0.9s;
      animation-fill-mode: forwards;
    }

    & .w100 {
      width: 100%;
    }
  }
`;

const Headline = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 12px;
  color: #353839;
  margin-bottom: 40px;

  & > span {
    padding-top: 3px;
    display: block;
    font-weight: 400;
    font-size: 9px;
  }
`;

const FbButton = styled.button`
  border: none;
  /* background: #3b5998; */
  background: #1d2122;
  /* background: rgb(194, 24, 7); */

  width: 160px;
  height: 25px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  border-radius: 4px;
  border: 1px solid #1d2122;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s linear;
  /* padding: 15px; */

  &:hover {
    background: #fff;
    color: #1d2122;
    /* border: 1px solid #1d2122; */
    font-weight: 600;
  }
`;

const ButtonFormBtn = styled.button`
  position: absolute;
  width: 50%;
  height: 60px;
  bottom: 0;
  border: 0;
  font-family: 'Dosis';
  font-size: 24px;
  text-transform: uppercase;
  cursor: pointer;

  &.sx {
    left: 0;
    border-radius: 0 0 0 5px;
    background-color: rgba(86, 71, 71, 0.45);
    /* background-color: #1d2122; */
    /* background-color: #545c5d; */

    color: #fff;
    transition: all 0.3s linear;

    &:hover {
      background-color: rgba(11, 13, 13, 0.6);
      /* background-color: #545c5d; */
      color: #fff;
    }

    &.back {
      background-color: rgba(86, 71, 71, 0.45);
      transition: all 0.3s linear;

      &:hover {
        background-color: rgba(11, 13, 13, 0.6);
      }
    }

    &.active-dx {
      animation-name: ${foregrounding_dx};
      animation-duration: 0.9s;
      animation-fill-mode: forwards;
    }
  }

  &.dx {
    right: 0;
    border-radius: 0 0 5px 0;
    /* background-color: #545c5d; */
    background-color: #1d2122;

    color: #fff;

    &:hover {
      color: #d3d3d3;
    }
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #c0c0c0;
  width: 85%;
  font-family: 'Roboto';
  color: #545c5d;
  text-align: left;
  font-size: 21px;
  font-weight: 100;
  margin-bottom: 25px;
  transition: all 0.3s;

  &:focus {
    /* border-bottom: 1px solid #d3d3d3; */
    border-bottom: 1px solid #1d2122;
    color: #1d2122;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  &::placeholder {
    color: #808080;
    opacity: 1;
    /* font-size: 1.5em; */
    transition: color 0.3s;
  }

  &:focus::placeholder {
    color: #1d2122;
  }

  &::-moz-placeholder {
    color: #808080;
    opacity: 1;
    transition: color 0.3s;
  }

  &:focus::-moz-placeholder {
    color: #1d2122;
  }
`;

const Signup_Login2 = ({ history }) => {
  const [isClicked, setIsClicked] = useState(false);

  const [isClicked2, setIsClicked2] = useState(false);

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

  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/dashboard');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser && history.location.pathname !== '/') {
    return <Redirect to="/dashboard" />;
  }

  return (
    // <Container>
    <LoginPage>
      <Form
        onSubmit={handleSignUp}
        className={`signUp ${isClicked && 'inactive-sx'} ${isClicked2 &&
          'active-sx'}`}
      >
        <h3>Create Your Account</h3>
        <Headline>
          Just enter your email address <br />
          and your password to join.
        </Headline>
        <Input
          name="email"
          type="email"
          placeholder="Insert Email"
          required
          autocomplete="off"
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Insert Password"
          required
        />

        <ButtonFormBtn
          className="sx"
          type="button"
          onClick={() => {
            setIsClicked(true);
            setIsClicked2(false);
          }}
        >
          Log in
        </ButtonFormBtn>
        <ButtonFormBtn className="dx" type="submit">
          Sign up
        </ButtonFormBtn>
      </Form>

      <Form
        onSubmit={handleLogin}
        className={`signIn ${isClicked && 'active-dx'} ${isClicked2 &&
          'inactive-dx'}`}
      >
        <h3 style={{ marginBottom: '0' }}>Welcome</h3>
        {/* <br></br> */}
        <h3>Back!</h3>
        <FbButton type="button" onClick={handleGoogleLogin}>
          Log In With Google
        </FbButton>
        <Headline>- or -</Headline>
        <Input
          name="email"
          type="email"
          placeholder="Insert Email"
          autocomplete="off"
          required
          className="w100"
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Insert Password"
          required
        ></Input>
        <ButtonFormBtn
          className={`sx back`}
          type="button"
          onClick={() => {
            setIsClicked(false);
            setIsClicked2(true);
          }}
        >
          Back
        </ButtonFormBtn>
        <ButtonFormBtn className="dx" type="submit">
          Log In
        </ButtonFormBtn>
      </Form>
      {/* </Container> */}
    </LoginPage>
  );
};

export default withRouter(Signup_Login2);
