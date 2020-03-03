import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FuncContext } from './contexts/FunctionsProvider';

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
  display: inline-block;
  border: 2px solid #333;
  width: 25px;
  height: 25px;
  border-radius: 2px !important;
  outline: 0;
  cursor: pointer;
  margin-left: 7px;
  margin-bottom: 5px;
  margin-top: 20px;

  /* margin-right: 10px; */
  transition: all 0.2s ease;

  &:active {
    transform: scale(1.05);
    border-radius: 30px;
  }
  svg {
    pointer-events: none;
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
  position: relative;
  bottom: 5px;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 5px 5px 10px;
  color: #303030;
  color: #606060;
  color: #505050;
  letter-spacing: 0.1px;
  display: inline-block;
  transition: all 0.2s;

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
    width: 80%;
    height: 1px;
    margin-top: 7px;
    background: #d8d8d8;
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
const CheckInput = props => {
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
          editTask(props.planId, e.target.checked);
        }}
      />
      <LabelBox htmlFor={props.id}>
        <svg viewBox="0,0,50,50">
          <path d="M5 30 L 20 45 L 45 5"></path>
        </svg>

        {/* <span className="taskText"> 30 min per day on programming</span> */}
      </LabelBox>
      <LabelText htmlFor={props.id}>{props.dailyTask}</LabelText>
      <div className="horizontalLine"></div>
    </>
  );
};

export default CheckInput;
