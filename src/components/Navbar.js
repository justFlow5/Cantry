import React, { useContext } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { firebase } from '../firebase/Firebase';

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
  background-color: rgba(0, 0, 0, 0.65);
  height: 50px;
  width: 100%;

  -webkit-box-shadow: 0px 1px 2px 0px rgba(61, 57, 61, 1);
  -moz-box-shadow: 0px 1px 2px 0px rgba(61, 57, 61, 1);
  box-shadow: 0px 1px 2px 0px rgba(61, 57, 61, 1);
  /* z-index: 3; */
  /* width: 100%; */
  display: flex;
  align-items: center;
  z-index: 9;

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
