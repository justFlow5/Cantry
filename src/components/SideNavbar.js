import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from './contexts/FunctionsProvider';

const SideNavbar = styled.nav`
  @media ${device.mobileS} {
    /* flex-direction: row; */
    /* width: unset; */
    display: none;
    height: 50px;
    /* top: unset; */
    bottom: 0;
    left: 0;
    right: 0;
  }

  @media ${device.laptop} {
    display: inline-block;
    height: unset;
    position: fixed;
    width: 200px;
    margin-top: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    /* background-color: rgba(202, 211, 200, 0.15);
  background-color: rgba(202, 211, 200, 0.5); */
    background-color: #e8e8e8;
    z-index: 0;
    /* box-shadow: 0 0 10px; */
    -webkit-box-shadow: 1px 3px 5px 0px rgba(173, 173, 173, 1);
    -moz-box-shadow: 1px 3px 5px 0px rgba(173, 173, 173, 1);
    box-shadow: 1px 3px 5px 0px rgba(173, 173, 173, 1);
  }
`;

const ListContainer = styled.ul`
  /* padding-top: 10px; */
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 15px;

  @media ${device.mobileS} {
    /* flex-direction: row; */
    flex-direction: row;
  }
`;

const ListItem = styled.li`
  position: relative;
  display: inline-block;
  /* background: transparent; */
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
  color: #676767;
  padding: 10px 0px;
  z-index: 100;
  border-bottom: 2px solid transparent;
  width: 100%;
  width: 130px;

  word-break: keep-all;
  white-space: nowrap;
  transition: all 0.4s;

  &:hover {
    border-bottom: 2px solid #1b1b1b;
    color: #1b1b1b;
  }
`;

export default () => {
  return (
    <SideNavbar>
      <ListContainer>
        <Link to="/dashboard/quote-settings">
          <ListItem>Quote Settings</ListItem>
        </Link>
        {/* <Link to="/dashboard/quote-settings">
          <ListItem>Plans Archive</ListItem>
        </Link> */}
      </ListContainer>
    </SideNavbar>
  );
};
