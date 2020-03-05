import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FuncContext } from './contexts/FunctionsProvider';
import { device } from './contexts/FunctionsProvider';

const Input = styled.input`
  &.check {
    position: absolute;
    opacity: 0;
    /* margin: 5px; */

    &:checked + label svg path {
      stroke-dashoffset: 0;
    }

    &:focus + label {
      transform: scale(1.03);
    }
  }
`;
const LabelBox = styled.label`
  @media ${device.mobileS} {
    display: inline-block;
    border: 2px solid #333;
    width: 20px;
    height: 20px;
    border-radius: 1px !important;
    outline: 0;
    cursor: pointer;
    margin-left: 7px;
    margin-bottom: 5px;
    margin-top: 20px;

    /* margin-right: 10px; */
    transition: all 0.2s ease;
  }

  @media ${device.tablet} {
    width: 25px;
    height: 25px;
  }

  @media ${device.laptop} {
  }

  &:active {
    transform: scale(1.05);
    border-radius: 30px;
  }
  svg {
    pointer-events: none;

    @media ${device.mobileS} {
      position: relative;
      top: 0px;
    }

    @media ${device.tablet} {
      position: relative;
      top: 0px;
    }
    path {
      fill: none;
      stroke: #333;
      stroke-width: 4px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 101;
      transition: all 350ms cubic-bezier(1, 0, 0.37, 0.91);
    }
  }
`;

const LabelText = styled.label`
  @media ${device.mobileS} {
    position: relative;
    bottom: 3px;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 5px 5px 10px;
    /* color: #303030;
    color: #606060; */
    color: #34353a;
    letter-spacing: 0.1px;
    display: inline;

    transition: all 0.2s;
  }

  @media ${device.mobileL} {
    padding: 5px 5px 5px 10px;
  }

  @media ${device.tablet} {
    font-size: 19px;
  }

  @media ${device.laptop} {
    padding: 5px 5px 5px 10px;
    font-size: 19px;
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }

  &.activeTask {
    background: #d6d7d8;
    border: 1px solid #858689;
    box-shadow: 0 0 10px;
    /* padding: 5px 20px; */
  }

  /* & + .horizontalLine {
    width: 80%;
    width: 0%;
    height: 1px;
    margin-top: 7px;
    background: #d8d8d8;
    transition: all 0.3s;
  }
  &:hover + .horizontalLine {
    width: 80%;
  } */

  & + .horizontalLine {
    @media ${device.mobileS} {
      width: 100%;
      height: 1px;
      margin-top: 0px;
      background: #d8d8d8;
    }

    @media ${device.tablet} {
      margin-top: 7px;
      width: 60%;
    }

    @media ${device.laptop} {
      margin-top: 7px;
      width: 60%;
    }
  }

  &:hover {
    font-weight: 400;
    color: #181818;
    color: #101010;
    color: #181818;
    /* letter-spacing: 0.15px; */
  }
`;

// const CheckInput = ({ dailyTask, id, planId, isChecked }) => {
const CheckInputEdit = props => {
  // console.log('DAILY FROM CHECK INPUT: ', dailyTask.dailyTask);
  const { editTask } = useContext(FuncContext);

  console.log('FORM INPUT: ', props.dailyTask);

  return (
    <>
      <Input
        type="checkbox"
        id={props.id}
        className="check"
        defaultChecked={props.isChecked}
        onChange={e => {
          if (props.planId) editTask(props.planId, e.target.checked);
        }}
      />
      <LabelBox htmlFor={props.id}>
        <svg viewBox="0,0,50,50">
          <path d="M5 30 L 20 45 L 45 5"></path>
        </svg>

        {/* <span className="taskText"> 30 min per day on programming</span> */}
      </LabelBox>
      <LabelText htmlFor={props.id}>{props.dailyTask}</LabelText>
    </>
  );
};

export default CheckInputEdit;
