import React from 'react';
import styled from 'styled-components';
import { device } from './contexts/FunctionsProvider';

const Button = styled.button`

@media (min-width: 320px) {


  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  border: 1.5px solid #1F1C23;
  outline: none;
  color: #1F1C23;
  white-space: nowrap;

  letter-spacing: 2px;
  background: 0 0;
  text-transform: uppercase;

  text-align: center;
  font-weight: 500;

  border-radius: 4px;
 

  
  transition: all 0.3s;
  font-size: 16px;
width: 260px;
  

  
  
  
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
	-moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
	-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
  
  margin: 0px 5px 40px;

}
@media (min-width: 560px) {
    font-size: 18px;

  }

  @media (min-width: 920px) {
    font-size: 18px;
    width: 285px;

  }



  &:first-child {
    margin-bottom: 5px;
    
      @media (min-width: 365px) {
        margin-bottom: 10px;
    }

    @media (min-width: 425px) {
        margin-bottom: 15px;
    }
  }



/* @media (min-width: 425px) {
 max-width: 80%; 

} */


  span {
    /* cursor: pointer; */
    display: inline-block;
    position: relative;
    transition: 0.3s;
  }
  
  span:after {
    /* content:"${props => (props.plus ? '\\002B' : '\\00bb')}"; */
    /* content:"${props => (props.plus ? '\\002B' : props.mark)}"; */
    content: "${props => props.mark}";

    position: absolute;
    opacity: 0;
    top: -1px;
   
    transform: scale(${props => props.scale});
    transform: rotate(${props => props.rotate});
    right: -25px;
    /* left: -30px; */

    transition: 0.3s;
  }
  
  :hover span {
    padding-right: 25px;
  }
  
  :hover span:after {
    opacity: 1;
    right: 0;
  }
  
  &[disabled],
  &[disabled]:hover, 
  &[disabled]:focus, 
  &[disabled]:active {
    cursor: not-allowed;
    /* background-color: #D0D0D0; */
    text-shadow: -1px -1px 0 rgba(0,0,0,0.3);

    span:after {
      opacity: 0;
    }
  span {
    padding-right: unset;
  }
  
    
  }
`;

export default props => {
  return (
    <>
      <Button
        width={props.width}
        mark={props.mark}
        scale={props.scale}
        onClick={props.action}
        disabled={props.disabled}
      >
        <span>{props.content}</span>
      </Button>
    </>
  );
};

// export default Button
