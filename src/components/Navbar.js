import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

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
  height: 50px;
  width: 100%;
  /* z-index: 3; */
  /* width: 100%; */
  display: flex;
  align-items: center;

  a {
    color: #fff;
    color: white;
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
    /* transform: scale(1.1); */
    /* font-size: 17.4px; */
    color: #e0e0e0;
    /* color: hsla(0, 0%, 100%, 0.7); */
  }
`;

export default () => {
  return (
    <NavBar>
      <Link to="/">HOME</Link>
      <Link to="/about">ABOUT</Link>
      <a>LOGOUT</a>
    </NavBar>
  );
};
