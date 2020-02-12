import React, { useState, useRef, useContext } from 'react';

import PlanContext from '../Plan-context';

import 'react-dates/initialize';
// import '../formComponents/_datepicker_custom.css';
import './_template_datePicker.css';

import { SingleDatePicker } from 'react-dates';

import styled from 'styled-components';
import NavBar from '../Navbar';

import Button from '../Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import SpecificsIcon from '../icons/SpecificsIcon';
import PriceIcon from '../icons/PriceIcon';
import ProgressIcon from '../icons/ProgressIcon';
import CheckInput from '../CheckInput';
import FeatherIcon from '../icons/Feather';

import moment from 'moment';

const PlanContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 70px auto;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  position: relative;
  /* background-color: #7d7d7d; */
  /* top: 350px; */
`;
const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0); */
  background-color: rgba(#000, 0.5);
  width: 100%;
  max-width: 800px;
  padding: 5px;
  border: 2px solid black;
  &:before,
  &:after {
    content: '•';
    position: absolute;
    width: 14px;
    height: 14px;
    font-size: 14px;
    color: black;
    border: 2px solid black;
    line-height: 12px;
    top: 5px;
    text-align: center;
  }
  &:before {
    left: 5px;
  }
  &:after {
    right: 5px;
  }

  .innerBox {
    position: relative;
    border: 2px solid black;
    padding: 53px;
    &:before,
    &:after {
      content: '•';
      position: absolute;
      width: 14px;
      height: 14px;
      font-size: 14px;
      color: black;
      border: 2px solid black;
      line-height: 12px;
      bottom: -2px;
      text-align: center;
    }
    &:before {
      left: -2px;
    }
    &:after {
      right: -2px;
    }
  }
`;

const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  /* border: 1px solid black; */
`;

// const PlanTitleContainer = styled.div`
//   &:hover {
//     cursor: pointer;
//     & .activeTitle {
//       /* &:before,
//       &:after {
//         width: 100%;
//         opacity: 1; */
//       &:before,
//       &:after {
//         width: 50%;
//       }
//     }
//   }
// `;
const PlanTitle = styled.h3`
  color: black;
  font-size: 42px;
  font-weight: 500;
  position: relative;
  outline: 0;
  padding: 10px 30px;
  transition: all 0.3s;

  &.activeTitle {
    background: #d6d7d8;
    border: 1px solid #858689;
    box-shadow: 0 0 10px;
  }
  & span {
    display: inline-block;

    position: absolute;
    top: -18%;
    right: 1%;
    & svg {
      width: 25px;
      height: 25px;
    }
  }
  /* margin-top: 50px; */

  /* &.activeTitle:before,
  &.activeTitle:after {
    content: '';
    position: absolute;
    bottom: -10px;
    width: 0px;
    height: 5px;
    margin: 5px 0 0;
    transition: all 0.2s ease-in-out;
    transition-duration: 0.4s;
    opacity: 0;
    background-color: black;

    &.activeTitle:before {
      left: 50%;
    }
    &.activeTitle:after {
      right: 50%;
    }
    &:hover {
      cursor: pointer;
      &:before,
      &:after {
        width: 100%;
        opacity: 1;
      }
    } */
  /* } */
`;

const Deadline = styled.p`
  font-size: 17px;
  /* width: 100%; */
  text-align: center;
  font-weight: 300;
  /* display: inline; */
  transition: all 0.3s;

  &.activeDeadline {
    background: #d6d7d8;
    border: 1px solid #858689;
    box-shadow: 0 0 10px;
  }

  & .spanIcon {
    display: inline-block;

    position: absolute;
    top: -18%;
    right: 1%;
    & svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  /* & > .container */
  & > .break {
    flex-basis: 100%;
    height: 0;
    margin: 0;
  }

  & .descriptorIcon {
    position: relative;
    bottom: -25px;
  }

  & > .descriptor {
    padding: 10px;
    display: flex;
    margin: 30px auto 0;
    width: 100%;

    /* flex: 1 1 0; */

    h4 {
      font-size: 22px;
      padding: 10px;
      display: inline-block;
      width: 20%;
      /* text-align: center; */
    }

    ul {
      padding: 5px 5px 0;
      list-style-type: none;
      width: 80%;

      li {
        padding: 0px 15px;
        text-decoration: none;
        margin-top: 25px;
        transition: all 0.3s;
        border: none;
        outline: none;
        box-shadow: none;
        padding: 10px;
        padding-right: 20px;
        position: relative;

        &:first-child {
          margin-top: 10px;
        }

        &.verticalBorder {
          /* border-left: 4px solid #716d6e; */
          /* border-left: 4px solid #34353a; */
          border-left: 4px solid #34353a;

          &.editActive {
            background: #d6d7d8;
            border: 1px solid #858689;
            box-shadow: 0 0 10px;
            /* padding: 10px; */
          }
        }
        & span {
          display: inline-block;
          position: absolute;
          top: 3%;
          /* left: 0; */
          right: 1%;
          width: 20px;
          height: 20px;
          /* bottom: 0; */
          /* z-index: -1; */
          & svg {
            position: absolute;
            /* top: -13%;
            right: 4%; */
            z-index: 2;
            /* padding-top: 5px; */

            /* width: 25px;
            height: 25px; */
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;

const Details = styled.div`
  /* margin: 0 auto; */
`;

const Price = styled.div``;

const DailyRegimen = styled.div``;

const PlanStage = styled.div`
  margin-top: 30px;
  width: 80%;
`;

const Graph = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: grey;
  display: inline-block;
`;

const StatText = styled.p`
  display: inline-block;
  font-size: 20px;
  color: black;
  margin-bottom: 80px;
`;

const GoToPlan = styled.div`
  position: absolute;
  bottom: 5px;
  right: 40px;
`;

const EditButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 18px;
  background: #858689;
`;

const EditPopUp = styled.div`
  position: fixed;
  width: 150px;
  height: 70px;
  /* background: rgba(255, 255, 255, 0.7); */
  background-color: rgba(0, 0, 0, 0.45);
  /* color: #d8d8d8; */
  color: #F9F4F3;
  border-radius: 10px;
  /* right: ${props => (props.hide ? '0' : '65px')}; */
  right: -150px;
  top: 15%;
  /* visibility: ${props => (props.hide ? 'hidden' : 'visible')}; */
  visibility: hidden;

  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 20px;

  transition: all 0.3s;

  &.appear {
    right: 30px;
    visibility: visible;

  }
`;

const PlanTemplate = ({ location }) => {
  const {
    plan,
    setGoal,
    setDeadline,
    setSpecificators,
    setPrices,
    setDailyTasks,
    deleteTempSpec,
    deleteTempPrice,
    deleteTempTask
  } = location.state;

  console.log('location.state: ', location.state.plan);

  const [isEditible, setIsEditible] = useState(false);

  const [isEditActive, setIsEditActive] = useState('');

  const formatGoal = str => str.replace(/\W+/g, '-').toLowerCase();

  return (
    <>
      <NavBar />
      <PlanContainer>
        <EditPopUp className={isEditible ? 'appear' : ''}>EDIT MODE</EditPopUp>}
        <Box>
          <div className="innerBox">
            <PlanContent>
              <PlanTitle>{plan.goal}</PlanTitle>
              <Deadline>
                <span>Deadline:</span>{' '}
                {moment(plan.deadline)
                  .format('DD MMM YYYY')
                  .toString()}
              </Deadline>

              <DescriptionContainer>
                <Details className="descriptor">
                  <span>
                    <SpecificsIcon width="25px" className="descriptorIcon" />{' '}
                  </span>
                  <h4> Make it specific:</h4>{' '}
                  <ul>
                    {plan.specificators.map(({ singleSpec, id }) => {
                      return (
                        <li
                          // className={isEditActive === id? 'editActive': ''}
                          key={id}
                          id={id}
                          className="verticalBorder"
                        >
                          {singleSpec}
                        </li>
                      );
                    })}
                  </ul>
                </Details>
                <Price className="descriptor">
                  <span>
                    <PriceIcon width="25px" className="descriptorIcon" />{' '}
                  </span>
                  <h4> Price to pay:</h4>
                  <ul>
                    {plan.prices.map(({ singlePrice, id }) => {
                      return (
                        <li key={id} id={id} className="verticalBorder">
                          {singlePrice}
                        </li>
                      );
                    })}
                  </ul>
                </Price>
                <div className="break"></div>
                <DailyRegimen className="descriptor">
                  {' '}
                  <span>
                    <ProgressIcon width="25px" className="descriptorIcon" />{' '}
                  </span>
                  <h4>Daily regimen</h4>
                  <ul>
                    {plan.dailyTasks.map(({ dailyTask, id }) => {
                      return (
                        <li key={id}>
                          <CheckInput
                            dailyTask={dailyTask}
                            id={id}
                            key={id}
                          ></CheckInput>
                        </li>
                      );
                    })}
                  </ul>
                </DailyRegimen>
              </DescriptionContainer>
              <PlanStage>
                <Graph />
                <StatText>You are on 20 day stroke.</StatText>
                <GoToPlan>
                  <Button
                    mark={'\\270E'}
                    content={'Tasks'}
                    width="175px"
                    scale="1.3"
                  ></Button>

                  {/* <EditButton ref={buttonContent} onClick={toggleEdit}>
                    edit
                  </EditButton> */}
                  {/* <Link to={`{plan/${goal}/edit}`}>Edit plan</Link> */}

                  <Link
                    to={{
                      pathname: `/plan/${formatGoal(plan.goal)}/edit`,
                      state: location.state
                    }}
                  >
                    Edit plan
                  </Link>
                </GoToPlan>
              </PlanStage>
            </PlanContent>
            {/* </InnerBox> */}
          </div>
        </Box>
      </PlanContainer>
    </>
  );
};

export default PlanTemplate;
