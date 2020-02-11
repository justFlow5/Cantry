import React, { useState, useRef, useContext } from 'react';
import PlanContext from './Plan-context';

import styled from 'styled-components';
// import { Link } from '@reach/router';
import PlanContent from './PlanContent';

import ExternalLinkIcon from './icons/LinkIcon';
import EditIcon from './icons/EditIcon';
import PlanIcon from './icons/PlanIcon';
import Chevron from './icons/Chevron';

import { BrowserRouter as Router, Link } from 'react-router-dom';
// import BoxInput from './checkInput';
// import Routerro from '../pages/plan2';

// import MySample from '../pages/mySample';
// const Accordion__section = styled.ul`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   background-color: #eaeff0;
//   background-color: #f7f9f5;
//   list-style-type: none;
//   margin: 15px;
// `;

const LinkContainer = styled.div`
  width: 100%;
  /* height: 70px; */
  margin-top: 50px;
`;

// const TaskContainer = styled.div`
//   margin: 20px auto 5px 5px;
//   width: 75%;

//   /* & .taskText {
//     position: relative;
//     bottom: 5px;
//     font-size: 18px;
//   }

//   hr {
//     width: 100%;
//   } */
// `;

const Accordion = styled.li`
  position: relative;
  font-size: 17px;
  color: #3c3c3c;

  border: 1px solid #bbbbbb;
  padding: 15px 20px;
  outline: none;
  border-radius: 10px;
  margin-top: 3px;
  /* margin-bottom: px; */
  cursor: pointer;
  font-weight: 400;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  transition: font-weight 0.2s color 0.3s, background 0.3s;
  /* 
  :last-child {
    margin-bottom: 30px;
  } */

  :hover,
  &.active {
    background: #eeeeee;
    background: linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%);
    color: #0e1111;
    font-weight: 400;
  }

  .accordionIcon {
    position: absolute;
    right: 15px;
    top: 20px;
    /* margin-left: auto; */
    transition: transform 0.6s ease;
  }
  .rotate {
    position: absolute;
    right: 15px;
    top: 20px;
    /* margin-left: auto; */
    transform: rotate(90deg);
    transition: transform 0.6s ease;
  }
`;

const AccordionContent = styled.div`
  background-color: white;
  background-color: #f7f7f7;
  overflow: hidden;
  transition: max-height 0.6s ease;
  position: relative;
  border: 1px solid #bbbbbb;
  border-top: none;
  border-radius: 0 0 15px 15px;
  margin-bottom: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);

  & .editIcon {
    background-image: url(${EditIcon});
    background-position: center;
    background-size: cover;
    width: 35px;
    height: 35px;
    display: inline-block;
    position: absolute;
    right: 45px;
    bottom: 5px;
    /* left: -6px;
    top: -6px; */

    padding: 1px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: white;
    transition: all 0.4s;
  }

  svg:hover {
    fill: #ffffff;

    background-color: #232b2b;
  }

  & .linkIcon {
    background-image: url(${ExternalLinkIcon});
    background-position: center;
    background-size: cover;
    width: 35px;
    height: 35px;
    display: inline-block;
    position: absolute;
    right: 3px;
    bottom: 5px;
    /* left: -6px;
    top: -6px; */

    padding: 4px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: white;
    /* background-color:  */
    transition: all 0.4s;
  }

  & .planIcon {
    background-image: url(${PlanIcon});
    background-position: center;
    background-size: cover;
    width: 35px;
    height: 35px;
    display: inline-block;
    position: absolute;
    right: 85px;
    bottom: 5px;
    cursor: pointer;

    padding: 4px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: white;
    transition: all 0.4s;
  }
`;

const SinglePlan = props => {
  const {
    setGoal,
    setDeadline,
    setSpecificators,
    setPrices,
    setDailyTasks
  } = useContext(PlanContext);

  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordionIcon');

  const { goal, dailyTasks, deadline } = props.plan;
  const { plan } = props;
  console.log('THE PLAN', plan);

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(setActive === 'active' ? 'accordionIcon' : 'rotate');
  }

  const formatGoal = str => str.replace(/\W+/g, '-').toLowerCase();

  return (
    <>
      <Accordion className={`${setActive}`} onClick={toggleAccordion}>
        {goal}
        <Chevron className={`${setRotate}`} width={10} fill={'#777'} />
      </Accordion>
      <AccordionContent ref={content} style={{ maxHeight: `${setHeight}` }}>
        {/* {props.children} */}
        <PlanContent deadline={deadline} dailyTasks={dailyTasks} />
        <LinkContainer>
          <EditIcon className={'editIcon'} />
          <ExternalLinkIcon className={'linkIcon'} />
          {console.log('HEERE IS THE PLAN BABE: ', plan)}
          {/* <Link to={`/plan/${formatGoal(goal)}`} state={plan}>
            <PlanIcon className={'planIcon'} />
          </Link> */}
          <Link to={{ pathname: `/plan/${formatGoal(goal)}`, state: plan }}>
            <PlanIcon className={'planIcon'} />
          </Link>
        </LinkContainer>
      </AccordionContent>
    </>
  );
};

export default SinglePlan;
