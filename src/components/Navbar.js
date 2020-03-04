import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from './contexts/FunctionsProvider';

import { BrowserRouter as Router, Link } from 'react-router-dom';

import { firebase } from '../firebase/Firebase';

const NavBar = styled.nav`
  @media ${device.mobileS} {
    height: 35px;
    position: fixed;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.65);
    width: 100%;
    top: 0;

    -webkit-box-shadow: 0px 1px 2px 0px rgba(61, 57, 61, 1);
    -moz-box-shadow: 0px 1px 2px 0px rgba(61, 57, 61, 1);
    box-shadow: 0px 1px 2px 0px rgba(61, 57, 61, 1);
    /* z-index: 3; */
    /* width: 100%; */
    display: flex;
    align-items: center;
    z-index: 9;
  }

  @media ${device.mobileL} {
    height: 40px;
  }

  @media ${device.tablet} {
    height: 45px;
  }


 

  @media ${device.laptop} {
    height: 50px;
  }

  a {
    @media ${device.mobileS} {
      color: #e0e0e0;
      text-decoration: none;
      font-size: 14px;
      margin: 0 10px;
      padding: 0px;
      position: relative;
      font-weight: 400;

      cursor: pointer;
      display: inline-block;
      /* transform: scale(1); */
      transition: all 0.2s;
    }



      @media ${device.mobileL} {
        font-size: 16px;
      }

      @media ${device.tablet} {
        font-size: 18px;
      }

      @media ${device.laptop} {
        color: #fff;
      color: #e0e0e0;
      font-size: 21px;
      margin: 0 10px;
      padding: 5px 10px;
    }
      }

      @media ${device.laptopL} {
        font-size: 23px;
      }

      @media ${device.desktop} {
        font-size: 24px;
      }


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
