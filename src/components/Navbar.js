import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
// import { logout } from '../index';
import { logout } from '../firebase/Firebase';
import netlifyIdentity from 'netlify-identity-widget';
import { navigate } from '@reach/router';
import UserContext from './User-context';

import { firebase } from '../firebase/Firebase';

// netlifyIdentity.init();

// const handleClick = () => {
//   netlifyIdentity.logout();
//   console.log('logged out');
//   navigate('/');
// };

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  margin: 0;
  /* z-index: 888; */
  background-color: #d1ccc0;
  background-color: #cad3c8;
  background-color: rgba(202, 211, 200, 1);
  background-color: #44474b;
  background-color: rgb(102, 102, 102);
  /* background-color: rgba(0, 0, 0, 0.53); */
  height: 50px;
  width: 100%;
  /* z-index: 3; */
  /* width: 100%; */
  display: flex;
  align-items: center;

  a {
    color: #fff;
    color: #e0e0e0;
    /* color: rgba(255, 255, 255, 0.5); */
    text-decoration: none;
    font-size: 20px;
    margin: 0 10px;
    padding: 5px 10px;
    position: relative;
    font-weight: 400;

    cursor: pointer;
    display: inline-block;
    /* transform: scale(1); */
    transition: all 0.2s;
  }

  a:last-child {
    margin-left: auto;
  }

  a:hover {
    color: white;
    /* transform: scale(1.1); */
    /* font-size: 17.4px; */
    /* color: hsla(0, 0%, 100%, 0.7); */
  }
`;

export default () => {
  // const { handleLogout } = useContext(UserContext);

  return (
    <NavBar>
      <Link to="/dashboard">HOME</Link>
      <Link to="/about">ABOUT</Link>

      {/* <a onClick={handleLogout}>LOGOUT</a> */}

      <a
        onClick={() => {
          localStorage.removeItem('plans');
          localStorage.removeItem('userData');
          firebase.auth().signOut();
        }}
      >
        LOGOUT
      </a>
    </NavBar>
  );
};
