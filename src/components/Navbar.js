import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from './contexts/FunctionsProvider';

import { BrowserRouter as Router, Link } from 'react-router-dom';

import { firebase } from '../firebase/Firebase';

import SettingsIcon from './icons/Settings';
import WingsLogo from '../images/wingsLogo.png';

const NavBar = styled.nav`
  @media ${device.mobileS} {
    height: 45px;
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

  /* @media ${device.mobileL} {
    height: 40px;
  } */

  @media ${device.tablet} {
    height: 45px;
  }


 

  @media ${device.laptop} {
    height: 50px;
  }

  @media ${device.desktop} {
    height: 60px;
  }

  a {
    @media ${device.mobileS} {
      color: #e0e0e0;
      text-decoration: none;
      font-size: 16px;
      margin: 0 10px;
      padding: 0px;
      position: relative;
      font-weight: 400;

      cursor: pointer;
      display: inline-block;
      &.logoName {
        display: none;
      }
      transition: all 0.2s;
    }



      @media ${device.mobileL} {
        font-size: 17px;

  
      }

      @media (min-width: 550px) {
        &.logoName {
        display: inline-block;
        margin-left: auto;
        font-weight: 500;
        letter-spacing: 1.4px;
        font-size: 25px;
        position: relative;
        top: -5px;
        font-family: 'Courgette', cursive;
        pointer-events: none;
      }

      & .logo{
        width: 50px;
      }
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
      

      @media ${device.laptopL} {
        font-size: 23px;
      }

      @media ${device.desktop} {
        font-size: 24px;
      }

      


    }

  a:last-child {
    margin-left: 5px;
    @media ${device.laptop} {
      margin-left: auto;
      } 
  }

  a:hover {
    color: white;
    /* transform: scale(1.1); */
    /* font-size: 17.4px; */
    /* color: hsla(0, 0%, 100%, 0.7); */
  }


  & .quoteOption {
        @media ${device.mobileS} {
 
        }
        @media ${device.laptop} {
        display: none;
        }
      }
`;

const Dropdown = styled.div`
  @media ${device.mobileS} {
    margin-left: auto;
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding: 5px 0px;
    width: 30px;
    height: 100%;
    margin-right: 15px;
  }

  @media ${device.laptop} {
    display: none;
  }

  & .quoteOption {
    height: 30px;

    &:hover {
      fill: white;
    }
  }

  &:hover .dropdownContent {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }

  & svg {
    width: 100%;
    height: 100%;
  }
`;
const DropdownContent = styled.div`
  opacity: 0;
  display: hidden;
  pointer-events: none;
  position: absolute;
  background-color: #f9f9f9;

  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  width: 150px;
  /* bottom: -95%; */
  transition: all 0.3s;

  & > a {
    width: 100%;
    position: relative;
    color: #282828;
    padding: 10px 15px;
    text-decoration: none;
    display: block;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 5px;
    transition: all 0.3s;
    left: -5px;

    &:hover {
      background-color: #d8d8d8;
      color: black;
    }
  }
`;

export default () => {
  // const { handleLogout } = useContext(UserContext);

  return (
    <NavBar>
      <Link to="/dashboard">HOME</Link>
      <Link to="/about">ABOUT</Link>

      {/* <a onClick={handleLogout}>LOGOUT</a> */}

      <a className="logoName">
        Cantry
        <img className="logo" src={WingsLogo} />
      </a>
      <Dropdown>
        <SettingsIcon className="quoteOption" />
        <DropdownContent className="dropdownContent">
          <Link to="/dashboard/quote-settings">Quote Settings</Link>
        </DropdownContent>
      </Dropdown>

      {/* <Link to="/quote-settings" className="quoteOption">
        <SettingsIcon className="options" />
      </Link> */}

      <a
        onClick={() => {
          localStorage.removeItem('plans');
          localStorage.removeItem('userData');
          localStorage.removeItem('todo');
          localStorage.removeItem('quoteStatus');
          localStorage.removeItem('quoteMany');
          localStorage.removeItem('quoteOne');

          firebase.auth().signOut();
        }}
      >
        LOGOUT
      </a>
    </NavBar>
  );
};
