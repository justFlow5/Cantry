import React, { useState, useRef, useContext } from 'react';
// import PlanContext from './contexts/Plan-context';
import { FuncContext } from './contexts/FunctionsProvider';

import styled from 'styled-components';
// import { Link } from '@reach/router';
import PlanContent from './PlanContent';

import ExternalLinkIcon from './icons/LinkIcon';
import EditIcon from './icons/EditIcon';
import PlanIcon from './icons/PlanIcon';
import Chevron from './icons/Chevron';
import PreviewIcon from './icons/Preview';
// import previewIcon2 from './icons/previewIcon2';

import { BrowserRouter as Router, Link } from 'react-router-dom';

const Accordion = styled.li`
  position: relative;
  z-index: 5;
  font-size: 17px;
  color: #3c3c3c;

  border: 1px solid #bbbbbb;
  padding: 15px 20px;
  outline: none;
  border-radius: 10px;
  margin-top: 3px;
  cursor: pointer;
  font-weight: 400;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  transition: font-weight 0.2s color 0.3s, background 0.3s;

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
`;

const LinkSection = styled.div`
  width: 100%;
  margin-top: 50px;
  position: relative;
`;

const LinkContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;

  & a {
    width: 37px;
    height: 37px;
    margin: 0 2px;
    position: relative;
    bottom: -4px;
    right: 0;
    background-color: rgba(244, 244, 244, 0.7);
    display: inline-block;
    z-index: 10;
    border-radius: 50%;

    &:hover .tooltipText {
      opacity: 1;
    }

    & .tooltipText {
      opacity: 0;
      /* width: 70px; */
      /* display: inline-block; */
      white-space: nowrap;
      background-color: #353839;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 10px;
      left: -19px;
      position: absolute;
      margin: 0 auto;
      z-index: 999;
      bottom: 135%;
      font-size: 12px;
      letter-spacing: 0.5px;
      transition: opacity 0.3s;

      &.tactic {
        left: -25px;
      }

      &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #353839 transparent transparent transparent;
      }
    }

    & svg {
      border: 1.5px solid #232b2b;
      border-radius: 50%;
      /* padding: 1px; */
      position: relative;
      z-index: 9;
      width: 37px;
      height: 37px;
      fill: #232b2b;
      box-shadow: 0 7px 7px -5px black;
      /* strokewidth: '20'; */
      transition: all 0.4s;

      &:hover {
        fill: #f7f7f7;
        background-color: #353839;
      }
    }
  }
`;
const SinglePlan = props => {
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
  // const classess = ['editIcon', 'tooltip'];

  return (
    <>
      <Accordion className={`${setActive}`} onClick={toggleAccordion}>
        {goal}
        <Chevron className={`${setRotate}`} width={10} fill={'#777'} />
      </Accordion>
      <AccordionContent ref={content} style={{ maxHeight: `${setHeight}` }}>
        {/* {props.children} */}
        <PlanContent deadline={deadline} dailyTasks={dailyTasks} />
        <LinkSection>
          <LinkContainer>
            <Link
              to={{
                pathname: `/plan/${formatGoal(goal)}`,
                state: {
                  plan
                }
              }}
            >
              <PreviewIcon />
              <span className="tooltipText">View Plan</span>
            </Link>

            <Link
              to={{
                pathname: `/plan/${formatGoal(goal)}/edit`,
                state: {
                  plan
                }
              }}
            >
              <EditIcon />
              {/* HICUUP */}
              <span className="tooltipText">Edit Plan</span>
              {/* </EditIcon> */}
            </Link>

            <Link
              to={{
                pathname: `/plan/${formatGoal(goal)}/tactic`,
                state: {
                  plan
                }
              }}
            >
              {' '}
              <ExternalLinkIcon />{' '}
              <span className="tooltipText tactic">View tactic</span>
            </Link>
          </LinkContainer>
        </LinkSection>
      </AccordionContent>
    </>
  );
};

export default SinglePlan;
