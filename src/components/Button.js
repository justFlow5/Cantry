import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  border: 1.5px solid #1F1C23;
  outline: none;
  color: #1F1C23;
  /* background-color: transparent; */
  margin: 40px;
  font-family: "Merriweather", serif;
  white-space: nowrap;

  letter-spacing: 2px;
  font-family: "Open Sans", sans-serif;
  background: 0 0;
  text-transform: uppercase;
  /* float: right; */
  text-align: center;
  font-weight: 500;

  border-radius: 4px;
  font-size: 18px;
  /* padding: 5px; */
  /* width: 300px; */
  width: ${props => props.width};
  transition: all 0.3s;
  /* cursor: pointer; */
  /* margin: 5px;
  margin-bottom: 20px; */
  margin: 0px 5px 40px;
 

  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;

  
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



     /* content: "\\002B"; */
    position: absolute;
    opacity: 0;
    top: -2px;
   
    transform: scale(${props => props.scale});
    transform: rotate(${props => props.rotate});
    right: -30px;
    /* left: -30px; */

    transition: 0.3s;
  }
  
  :hover span {
    padding-right: 35px;
  

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
