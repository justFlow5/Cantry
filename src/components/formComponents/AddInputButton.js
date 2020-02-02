import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const AddButton = styled.button`
    position: absolute;
    z-index: 900;
    right: 26%;
    /* bottom: -13%; */
  width: 40px;
  height: 40px;
  border: 2px solid #383838;
  border: 2px solid #333333;
  border-radius: 50%;
  padding: 3px;
  color: #383838;
  cursor: pointer;
  outline: none;
  font-size: 24px;
  font-weight: 600;
  background: #d8d8d8;
  background: #333333;
  color: #f0f0f0;
  display: inline-block;
  box-shadow: unset;
  transition: font-size 0.2s ease-in-out, font-weight 0.4s, transform 0.2s, box-shadow 0.3s;

  &:hover {

    box-shadow: 2px 2px 5px #383838;
    font-weight: 700;
    /* font-size: 24.5px; */

  }

  &:active {
        
            transform: translateY(2px);
`;

export default props => {
  return <AddButton onClick={props.addField}>+</AddButton>;
};
