import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../contexts/FunctionsProvider';

const Request = styled.label`
  cursor: pointer;
  display: inline-block;
  text-align: center;
  .title {
    @media ${device.mobileS} {
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 1px;
      text-align: center;
      color: rgba(0, 0, 0, 0.8);
      padding: 0 5px 10px;
      border-bottom: 1px solid #909090;
      display: inline-block;
      margin-bottom: 10px;
    }

    @media ${device.mobileL} {
      font-size: 24px;
    }

    @media ${device.tablet} {
      font-size: 26px;
    }

    @media ${device.laptop} {
      font-size: 28px;
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
      font-size: 32px;
    }
  }

  & p {
    @media ${device.mobileS} {
      margin: 0px 15%;
      display: inline-block;
      text-align: left;
      font-size: 13px;
      line-height: 1.4;
    }

    @media ${device.mobileL} {
      font-size: 16px;
    }

    @media ${device.tablet} {
      font-size: 17px;
    }

    @media ${device.laptop} {
      font-size: 18px;
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
      font-size: 21px;
    }
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
