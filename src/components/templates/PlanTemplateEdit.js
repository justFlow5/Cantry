import React, { useState, useRef } from 'react';
import { Link } from '@reach/router';

import 'react-dates/initialize';
// import '../formComponents/_datepicker_custom.css';
import './_template_datePicker.css';

import { SingleDatePicker } from 'react-dates';

import InputFieldEdit from '../formComponents/InputFieldEdit';

import styled from 'styled-components';
import NavBar from '../Navbar';

import Button from '../Button';

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

const PlanTitle = styled.h3`
  color: black;
  font-size: 42px;
  font-weight: 500;
  position: relative;
  outline: 0;
  padding: 15px 30px;
  height: 60px;
  transition: all 0.3s;

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
`;

const Deadline = styled.p`
  /* font-size: 17px; */
  /* width: 100%; */
  text-align: center;
  /* font-weight: 300; */
  margin: 15px 0;
  /* display: inline-block; */

  transition: all 0.3s;
  & > span {
    /* margin-right: 5px; */
    font-weight: 500;
    position: relative;
    /* bottom: 8px; */
    font-size: 19px;
    line-height: 1.2;
  }
  & textarea {
    padding-bottom: 0px;
    width: auto;
    font-size: 18px;
  }
  & > * {
    display: inline-block;
    & > * {
      display: inline-block;
    }
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-self: center;
  align-items: center;

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
    width: 100%;
    /* margin: 30px auto 0; */

    /* flex: 1 1 0; */

    & .deleteField {
      position: absolute;
      /* top: 5px; */
      /* right: 5px; */
      font-size: 12px;
      color: #414a4c;
      cursor: pointer;
      border-radius: 50%;
      padding: 2px 2px 2px 4px;
      /* padding: 3px; */
      z-index: 12;
      font-weight: 400;

      transition: color 0.3s, font-weight 0.1s linear, background-color 0.3s;

      &:hover {
        color: #0e1111;
        color: black;
        font-weight: 600;

        background-color: #e6e6e6;
        /* padding: 3px; */
      }
    }
    h4 {
      font-size: 22px;
      padding: 10px;
      display: inline-block;
      width: 20%;
      /* text-align: center; */
    }

    ul {
      padding: 5px 10px 0 45px;
      list-style-type: none;
      width: 80%;
      position: relative;

      li {
        padding: 0px 10px;
        text-decoration: none;
        /* margin-top: 25px; */
        transition: all 0.3s;
        border: none;
        outline: none;
        box-shadow: none;
        /* padding: 10px; */
        /* padding-right: 20px; */
        position: relative;
        width: 100%;

        &:first-child {
          margin-top: 10px;
        }

        &.thinBorder {
          border-left: 3px solid #c2c2c2;
        }

        &.thickBorder {
          border-left: 3px solid #34353a;
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
  color: #d8d8d8;
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

const PlanTemplateEdit = ({ location }) => {
  const {
    plan
    // setGoal,
    // setDeadline,
    // setSpecificators,
    // setPrices,
    // setDailyTasks,
    // deleteTempSpec,
    // deleteTempPrice,
    // deleteTempTask
  } = location.state;
  // console.log('location.state: ', location.state);
  // console.log('EVAAAL: ', typeof deleteTempSpec);

  // const deleteSpec = new Function('id', deleteTempSpec);

  const [verticalBorder, setVerticalBorder] = useState('');

  const [clickedInputId, setClickedInputId] = useState('');

  const [superNewDeadline, setSuperNewDeadline] = useState('');

  const [isClicked, setIsClicked] = useState(false);

  const [focused, setFocused] = useState(null);

  const buttonContent = useRef(null);

  const showCalendar = () => {
    if (!isClicked) setIsClicked(true);
  };

  const hideCalendar = () => {
    if (isClicked) setIsClicked(false);
  };

  const onDateChange = newDeadline => {
    if (newDeadline) {
      setSuperNewDeadline(newDeadline);
    }
  };

  const getId = e => {
    setClickedInputId(e.target.id);
    console.log();
  };

  const formatGoal = str => str.replace(/\W+/g, '-').toLowerCase();

  // const closeEdit = e => {
  //   e.target.style.background = 'rgba(244, 244, 244, 0.7)';
  // };

  const setThickBorder = e => {
    if (verticalBorder === '') setVerticalBorder('thickBorder');
  };

  const setThinBorder = () => {
    if (verticalBorder === 'thickBorder') setVerticalBorder('');
  };

  return (
    <>
      <NavBar />
      <PlanContainer>
        {/* <EditPopUp className={isEditible ? 'appear' : ''}>EDIT MODE</EditPopUp>} */}
        <Box>
          {/* <InnerBox> */}
          <div className="innerBox">
            <PlanContent>
              <div className="example">
                {/* <PlanTitleContainer> */}
                <PlanTitle>
                  <InputFieldEdit value={plan.goal} name="goal" />
                </PlanTitle>
                {/* {isEditible && <img src={Feather} alt="feather pen"></img>} */}
                {/* </PlanTitleContainer> */}
              </div>
              <Deadline onClick={showCalendar} onBlur={hideCalendar}>
                <span>Deadline:</span>
                {/* {isClicked ? ( */}
                <SingleDatePicker
                  placeholder={moment(plan.deadline).format('DD MMM YYYY')}
                  date={superNewDeadline} // momentPropTypes.momentObj or null
                  onDateChange={date => onDateChange(date)} // PropTypes.func.isRequired
                  focused={focused} // PropTypes.bool
                  onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequiredfunc.isRequired
                  id="mydatepickerr" // PropTypes.string.isRequired,
                  displayFormat={'DD MMM YYYY'}
                  numberOfMonths={1}
                  openDirection="down"
                  hideKeyboardShortcutsPanel={true}
                />
                {/* // ) : (
                //   <InputFieldEdit */}
                {/* //     textarea
                //     value={moment(deadline).format('DD MMM YYYY')}
                //     name="deadline"
                //     style={{ display: 'inline-block' }}
                //   />
                // )} */}
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
                        <>
                          {console.log('specID: ', id)}
                          <li
                            key={id}
                            id={id}
                            // className={`thinBorder ${verticalBorder}`}
                            className={
                              clickedInputId === id
                                ? 'thickBorder'
                                : 'thinBorder'
                            }
                            onClick={getId}
                            onBlur={() => {
                              setClickedInputId('');
                            }}
                          >
                            <InputFieldEdit
                              value={singleSpec}
                              id={id}
                              name="specificators"
                              textarea
                            />

                            <span
                              id={id}
                              className="deleteField"
                              // onClick={() => {
                              //   console.log('SPAN ID : ', id);
                              //   console.log(
                              //     'specificators.length: ',
                              //     plan.specificators.length
                              //   );
                              //   deleteSpec(id);
                              //   console.log(
                              //     'specificators.length2: ',
                              //     plan.specificators.length
                              //   );
                              // }}
                            >
                              &#x2715;
                            </span>
                          </li>
                        </>
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
                        <li
                          key={id}
                          id={id}
                          // className={`thinBorder ${verticalBorder}`}
                          className={
                            clickedInputId === id ? 'thickBorder' : 'thinBorder'
                          }
                          onClick={getId}
                          onBlur={() => {
                            setClickedInputId('');
                          }}
                          spellcheck="false"
                        >
                          <InputFieldEdit
                            value={singlePrice}
                            id={id}
                            name="prices"
                            textarea
                          />
                          <span className="deleteField">&#x2715;</span>
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
                      // const newId = `check${Date.now()}${id}`;
                      // console.log(newId);
                      return (
                        <li
                          key={id}
                          id={id}
                          // className={`thinBorder ${verticalBorder}`}
                          className={
                            clickedInputId === id ? 'thickBorder' : 'thinBorder'
                          }
                          onClick={getId}
                          onBlur={() => {
                            setClickedInputId('');
                          }}
                          spellcheck="false"
                        >
                          <InputFieldEdit
                            value={dailyTask}
                            id={id}
                            name="dailyTasks"
                            textarea
                          />
                          <span className="deleteField">&#x2715;</span>
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

export default PlanTemplateEdit;
