import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// const showText = keyframes`
//  0% {
//           opacity: 0;

//           transform: scale(0) translate(0);
//           background: none;
//         }

//         80% {
//           background: none;
//         }

//         100% {

//           transform: scale(1) translate(-70px);

//         }
// `;

const NextStep = styled.div`
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  outline: 0;

  width: 60px;
  height: 60px;

  position: absolute;
  /* top: 6%;
  right: 8%; */
  top: 0;
  right: 0;
  z-index: 998;

  display: inline-block;

  /* display: none; */
  & > span {
    position: absolute;
    top: -1px;
    right: -2px;
    display: inline-block;
    /* z-index: 999; */
    text-align: center;
    color: #1d2122;
    /* white-space: nowrap; */
    /* overflow-wrap: break-word; */
    max-width: 170px;
    /* top: 38px; */
    font-size: 16px;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: 0.8px;

    opacity: 0;
    transform: scale(0) translate(0);
    white-space: pre-line;
    width: 85px;
    transition: all 0.3s;

    &.active {
      opacity: 1;
      transform: scale(1) translate(-55px);

      &.leftArrow {
        transform: scale(1) translate(55px);
      }
    }
  }
`;

const Paginate = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transform: translate3d(0, 0, 0);

  position: relative;
  /* top: 50%; */

  &[disabled] {
    pointer-events: none;

    & i {
      background: #a6a6a6;
      transition: all 0.3s;
    }
  }

  &.right {
    -webkit-appearance: none;
    background: transparent;
    border: 0;
    outline: 0;

    /* padding: 30px; */

    & i {
      transform-origin: 100% 50%;
    }

    &.hovered {
      & i:first-child {
        transform: translate(0px, 1px) rotate(50deg);
      }
      & i:last-child {
        transform: translate(0px, -1px) rotate(-50deg);
      }
    }
  }

  &.left {
    -webkit-appearance: none;
    background: transparent;
    border: 0;
    outline: 0;

    /* padding: 30px; */

    & i {
      transform-origin: 0% 50%;
    }

    &.hovered {
      & i:first-child {
        transform: translate(0px, -1px) rotate(50deg);
      }
      & i:last-child {
        transform: translate(0px, -1px) rotate(-50deg);
      }
    }
  }

  & i {
    position: absolute;
    top: 40%;
    left: 0;
    width: 40px;
    height: 3px;
    border-radius: 5px / 2;

    background: #1d2122;

    transition: all 0.15s ease;

    &:first-child {
      transform: translate(0px, 1px) rotate(40deg);

      /* &:hover {
        transform: translate(0px, 1px) rotate(50deg);
      } */
      &.active {
        transform: translate(1px, 1px) rotate(60deg);
      }
    }

    &:last-child {
      transform: translate(0px, -1px) rotate(-40deg);
      /* &.hover {
        transform: translate(0px, -1px) rotate(-50deg);
      } */
      &.active {
        transform: translate(1px, -1px) rotate(-60deg);
      }
    }
  }
`;

const NavigationArrow = props => {
  const [isHovered, setIsHovered] = useState('');

  const [arrowDirection, setArrowDirection] = useState(props.arrowDirection);

  //   useEffect(() => {
  //     setArrowDirection(props.arrowDirection ? 'left' : 'right');
  //   }, []);

  return (
    <NextStep>
      <span
        className={`text ${isHovered ? 'active' : ''} ${
          props.arrowDirection === 'left' ? 'leftArrow' : ''
        }`}
      >
        {props.nextContent}
      </span>
      <Paginate
        left
        className={`${props.arrowDirection} ${isHovered}`}
        onClick={() => {
          props.nextStep();
        }}
        onMouseEnter={() => {
          setIsHovered('hovered');
        }}
        onMouseLeave={() => {
          setIsHovered('');
        }}
        disabled={props.disabled}
      >
        <i></i>
        <i></i>
      </Paginate>
    </NextStep>
  );
};

export default NavigationArrow;
