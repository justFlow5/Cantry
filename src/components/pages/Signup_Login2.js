import React, { useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import styled, { keyframes } from 'styled-components';

import { firebase, googleAuthProvider } from '../../firebase/Firebase';
import { AuthContext } from '../contexts/Auth';
import BgImg from '../../images/bgImg2.jpg';

import { device } from '../contexts/FunctionsProvider';

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
  @media ${device.mobileL} {
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
  }

  /* background-size: 100% 100%; */
`;

const Form = styled.form`
  @media ${device.mobileS} {
    position: absolute;
    right: 19%;
    top: 5%;
    text-align: center;
    background: #fff;

    width: 250px;
    height: 350px;

    border-radius: 5px;
    padding: 30px 20px 0 20px;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
  }

  @media ${device.laptop} {
    width: 310px;
    height: 470px;
    right: 25%;
  }

  & > h3 {
    @media ${device.mobileS} {
      font-size: 22px;
      text-transform: uppercase;
      color: #353839;
      margin-bottom: 15px;
    }

    @media ${device.mobileL} {
      font-size: 25px;
    }

    @media ${device.tablet} {
      font-size: 29px;
      margin-bottom: 30px;
    }

    @media ${device.laptop} {
      font-size: 35px;
    }

    @media ${device.desktop} {
      font-size: 40px;
    }
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
  @media ${device.mobileS} {
    font-weight: 200;
    text-transform: uppercase;
    font-size: 10px;
    color: #353839;
    margin-bottom: 15px;
  }

  @media ${device.mobileL} {
  }

  @media ${device.tablet} {
    margin-bottom: 40px;
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }
  & > span {
    padding-top: 3px;
    display: block;
    font-weight: 400;
    font-size: 9px;
  }
`;

const FbButton = styled.button`
  @media ${device.mobileS} {
    border: none;
    background: #538464;
    width: 120px;
    height: 25px;
    font-size: 10px;
    color: #fff;
    text-transform: uppercase;
    border-radius: 4px;
    border: 1px solid #538464;
    cursor: pointer;
    margin-bottom: 5px;
    transition: all 0.3s linear;

    &.anon {
      margin-bottom: 15px;
    }
  }

  @media ${device.mobileL} {
    width: 140px;
    font-size: 11px;
  }

  @media ${device.tablet} {
    width: 150px;
    font-size: 12px;
  }

  @media ${device.laptop} {
    width: 160px;
    font-size: 11px;
    margin-bottom: 5px;
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }

  &:hover {
    background: #fff;
    color: #1d2122;
    /* border: 1px solid #1d2122; */
    font-weight: 600;
  }
`;

const ButtonFormBtn = styled.button`
  @media ${device.mobileS} {
    position: absolute;
    width: 50%;
    height: 45px;
    bottom: 0;
    border: 0;
    font-size: 17px;
    text-transform: uppercase;
    cursor: pointer;
  }

  @media ${device.mobileL} {
    font-size: 18px;
    height: 50px;
  }

  @media ${device.tablet} {
    font-size: 20px;
    height: 55px;
  }

  @media ${device.laptop} {
    font-size: 24px;
    height: 60px;
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }

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
  @media ${device.mobileS} {
    border: none;
    /* border-bottom: 1px solid #414a4c; */
    border-bottom: 1px solid #c0c0c0;

    width: 85%;
    /* color: #545c5d; */
    color: #1d2122;
    text-align: left;
    font-size: 17px;
    font-weight: 100;
    margin-bottom: 25px;

    transition: all 0.3s;
  }

  @media ${device.mobileL} {
    font-size: 18px;
  }

  @media ${device.tablet} {
    font-size: 21px;
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }

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
    async (event) => {
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

  const handleAnonimousLogin = () => {
    return firebase.auth().signInAnonymously();
  };

  const handleSignUp = useCallback(
    async (event) => {
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
          Login With Google
        </FbButton>

        <FbButton className="anon" type="button" onClick={handleAnonimousLogin}>
          Login Anonymously
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
