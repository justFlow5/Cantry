import React from 'react';
import styled from 'styled-components';

const SideNavbar = styled.nav`
  position: relative;
  width: 200px;
  margin-top: 50px;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(202, 211, 200, 0.15);
  background-color: rgba(202, 211, 200, 0.5);
  background-color: #e8e8e8;
  z-index: -1;
`;

export default () => {
  return <SideNavbar></SideNavbar>;
};
