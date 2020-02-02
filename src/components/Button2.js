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
  cursor: pointer;
  /* margin: 5px; */
  /* margin-bottom: 20px; */
  margin: 0px 5px 40px;

 

  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
  
  :hover {
    /* background: #2d2833; 
     color: white; */
  }
  
  span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.3s;
  }
  
  span:before {
    /* content:"${props => (props.plus ? '\\002B' : '\\00bb')}"; */
    /* content:"${props => (props.plus ? '\\002B' : props.mark)}"; */
    content: "${props => props.mark}";



     /* content: "\\002B"; */
    position: absolute;
    opacity: 0;
    top: 1px;
   
    font-size: 26px;
    padding-top: 2px;
    /* transform: rotate(${props => props.rotate}); */
    transform: rotate(180deg);
    left: -30px;

    transition: 0.3s;
  }
  
  :hover span {
    
    padding-left: 25px;

  }
  
  :hover span:before {
    opacity: 1;
    left: 0;
    transform: rotate(180deg)
  }
`;

export default props => {
  return (
    <>
      {/* {props.plus ? (
        // <Button plus>
        <Button plus width={props.width}>
          <span>{props.content}</span>
        </Button>
      ) : (
        <Button mark={'\\00bb'} width={props.width}>
          <span>{props.content}</span>
        </Button>
      )} */}

      <Button
        width={props.width}
        mark={props.mark}
        scale={props.scale}
        onClick={props.action}
        // onClick={props.displayForm}
        // onClick={props.toggleModal}
      >
        <span>{props.content}</span>
      </Button>
    </>
  );
};

// export default Button
