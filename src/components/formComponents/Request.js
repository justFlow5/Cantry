import React, { useContext } from 'react';
import styled from 'styled-components';

const Request = styled.label`
  cursor: pointer;
  display: inline-block;
  text-align: center;
  .title {
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
    padding: 0 5px 10px;
    border-bottom: 1px solid #909090;
    display: inline-block;
    margin-bottom: 10px;
  }

  p {
    margin: 0px 15%;
    display: inline-block;
    text-align: left;
    font-size: 18px;
    line-height: 1.4;
  }
`;

export default props => {
  return (
    <Request htmlFor={props.htmlFor}>
      <h3 className="title">{props.title}</h3>
      <br></br> <p>{props.subtext}</p>
    </Request>
  );
};
