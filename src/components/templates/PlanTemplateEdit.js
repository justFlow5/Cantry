import React, { useState, useRef, useContext } from 'react';
import { Link } from '@reach/router';
import uuid from 'uuid';
import { device } from '../contexts/FunctionsProvider';

import 'react-dates/initialize';
// import '../formComponents/_datepicker_custom.css';
import './_template_datePicker.css';

import { SingleDatePicker } from 'react-dates';

import InputFieldEdit from '../formComponents/InputFieldEdit';

import styled, { keyframes } from 'styled-components';
import NavBar from '../Navbar';

// import Button from '../Button';

import SpecificsIcon from '../icons/SpecificsIcon';
import PriceIcon from '../icons/PriceIcon';
import Strong from '../icons/Strong';

import { FuncContext } from '../contexts/FunctionsProvider';
import ModalDeletePlan from '../ModalDeletePlan';

import moment from 'moment';

const popupAppear = keyframes`
  0% {   
    opacity: 0;
    transform: translateX(100%);
      }
  10% {
    opacity: 1;
    transform: translateX(-20%);
  }
  90% {
    opacity: 1;
    transform: translateX(-20%);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const PlanContainer = styled.div`
  @media ${device.mobileS} {
    width: 100%;
    display: flex;
    width: 100%;
    margin: 70px auto;
    align-items: center;
    justify-content: center;
    /* border: 1px solid black; */
    position: relative;
    overflow: hidden;
  }

  @media ${device.tablet} {
    width: 80%;
  }
  /* background-color: #7d7d7d; */
  /* top: 350px; */
`;
const Box = styled.div`
  @media ${device.tablet} {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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
  }
`;

const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  /* border: 1px solid black; */

  & .example {
    width: 100%;

    /* & > h3 {

    } */
  }
`;

const PlanTitle = styled.h3`
  @media ${device.mobileS} {
    width: 100%;
    /* margin: 0 auto; */

    color: black;
    font-size: 20px;
    font-weight: 500;
    position: relative;
    outline: 0;
    padding: 15px 30px 0px;
    height: 40px;
    text-align: center;
    transition: all 0.3s;

    @media ${device.mobileL} {
      width: 75%;
      margin: 0 auto;
    }

    & input {
      font-size: 32px;
    }

    /* & textarea {
      font-size: 17px;
    } */
  }

  @media ${device.mobileL} {
    font-size: 22px;
  }

  @media ${device.tablet} {
    /* font-size: 38px; */
    /* height: 50px; */
  }

  @media ${device.laptop} {
    /* font-size: 34px; */
  }

  @media ${device.laptopL} {
    font-size: 54px;
    height: 60px;
  }

  @media ${device.desktop} {
    font-size: 40px;
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
`;

const Deadline = styled.p`
  @media ${device.mobileS} {
    padding-top: 15px;
    text-align: center;
    /* font-weight: 300; */
    margin: 0;
    /* display: inline-block; */

    transition: all 0.3s;
  }

  @media ${device.tablet} {
    margin: 0px 0 15px;
  }

  & > span {
    @media ${device.mobileS} {
      font-weight: 700;
      position: relative;
      /* bottom: 8px; */
      font-size: 18px;
      line-height: 1.2;
      /* right: -15px;
      z-index: 899; */
    }

    @media ${device.mobileL} {
    }

    @media ${device.tablet} {
      font-size: 19px;
    }

    @media ${device.laptop} {
      font-size: 19px;
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
    }

    /* margin-right: 5px; */
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
  justify-content: center;

  /* & > .container */
  & > .break {
    flex-basis: 100%;
    height: 0;
    margin: 0;
  }

  & .descriptorIcon {
    position: relative;
    bottom: -25px;

    @media ${device.mobileS} {
      width: 35px;
      height: 35px;
      margin-bottom: 10px;
    }

    @media ${device.mobileL} {
      width: 35px;
      height: 35px;
    }

    @media ${device.tablet} {
      width: 30px;
      height: 30px;
      right: -5px;
      margin-bottom: initial;

      &.price {
        bottom: -40px;
      }

      &.spec {
        bottom: -33px;
      }
    }
  }
  & > .descriptor {
    @media ${device.mobileS} {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      border-bottom: 1px solid #8e8e8e;
    }
    &:last-child {
      border-bottom: none;
    }

    @media (min-width: 510px) {
      width: 70%;
    }
    @media ${device.tablet} {
      width: 100%;
      padding: 20px 0;
      padding: 40px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      /* align-items: center; */

      &:first-child {
        padding-top: 25px;
      }
    }

    & .deleteField {
      position: absolute;
      top: -5px;
      /* right: -5px; */
      font-size: 12px;
      color: #414a4c;
      cursor: pointer;
      border-radius: 50%;
      padding: 2px 2px 2px 4px;
      /* margin-left: 5px; */
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
      @media ${device.mobileS} {
        font-size: 23px;
        display: inline-block;
        text-align: center;
        width: 90%;
        padding: 20px 0 0;
      }

      @media ${device.tablet} {
        font-size: 19px;
        width: 20%;
        text-align: center;
        padding: 10px;
        font-size: 22px;
        margin-right: 10px;
      }
      & .break {
        @media ${device.tablet} {
          display: block;
        }
      }
    }

    ul {
      @media ${device.mobileS} {
        list-style-type: none;
        width: 90%;
        padding-right: 5px;
        padding-bottom: 30px;

        &:last-child {
          /* width: 100%; */
        }
      }

      @media ${device.mobileM} {
      }

      @media ${device.mobileL} {
      }
      @media ${device.tablet} {
        list-style-type: none;
        padding-right: 5px;
        width: 80%;
      }

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

        & textarea {
          @media ${device.mobileS} {
            font-size: 16px;
          }
          @media (min-width: 545px) {
            font-size: 18px;
          }

          @media ${device.desktop} {
            font-size: 24px;
          }
        }

        &:last-child {
          @media ${device.mobileS} {
            margin-bottom: 20px;
          }
          @media ${device.tablet} {
            margin-bottom: inherit;
          }
        }

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

// const EditPopUp = styled.div`
//   position: fixed;
//   width: 150px;
//   height: 70px;
//   /* background: rgba(255, 255, 255, 0.7); */
//   background-color: rgba(0, 0, 0, 0.45);
//   color: #d8d8d8;
//   border-radius: 10px;
//   /* right: ${props => (props.hide ? '0' : '65px')}; */
//   right: -150px;
//   top: 15%;
//   /* visibility: ${props => (props.hide ? 'hidden' : 'visible')}; */
//   visibility: hidden;

//   font-size: 24px;
//   font-weight: 600;
//   letter-spacing: 1px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 5px 5px 20px;

//   transition: all 0.3s;

//   &.appear {
//     right: 30px;
//     visibility: visible;

//   }
// `;

const NewField = styled.button`
  @media ${device.mobileS} {
    width: 150px;
    display: inline-block;
    color: #c2c2c2;
    background-color: rgba(247, 247, 247, 1);
    position: relative;
    left: 15px;
    letter-spacing: 1.5px;
    font-size: 10px;
    text-transform: uppercase;
    transition: all 0.3s;
    border: 1px solid #c2c2c2;
    border-radius: 10px;
    padding: 7px 11px 7px 16px;
    text-align: left;
    cursor: pointer;
    font-weight: 600;

    color: #1d2122;
    border: 1px solid #1d2122;
  }

  @media ${device.mobileL} {
    width: 170px;
    font-size: 10px;
  }

  @media ${device.tablet} {
    border: 1px solid #c2c2c2;
    color: #c2c2c2;
    font-size: 11px;
    left: 15px;
    width: 200px;
    padding: 10px 15px 10px 20px;
  }

  @media ${device.laptop} {
    font-size: 11px;
  }

  & > span {
    font-size: 16px;
    position: absolute;
    left: 2.5%;
    top: 25%;
  }

  &:hover {
    color: #1d2122;
    border: 1px solid #1d2122;
  }
`;

const ButtonContainer = styled.div`
  @media ${device.mobileS} {
    margin-top: 45px;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    justify-content: center;

    align-items: center;
  }
  & button:first-child {
    @media ${device.mobileS} {
      margin-top: 10px;
    }
    @media ${device.mobileL} {
      margin-top: unset;
    }
  }

  @media ${device.mobileL} {
    margin-top: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  @media ${device.tablet} {
    margin-top: 45px;

    justify-content: space-between;
  }

  @media ${device.laptop} {
    margin-top: 60px;

    justify-content: space-around;
  }
`;

const EditButton = styled.button`
  width: 220px;
  height: 50px;
  /* color: #e2e2e2; */
  color: #eaeff0;
  border: 1px solid #1d2122;
  border-radius: 4px;
  background-color: #1d2122;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: 0.6px;
  letter-spacing: 1.5px;
  cursor: pointer;
  text-transform: uppercase;

  transition: all 0.3s;

  &:hover {
    color: #b1b1b1;
    border: 1px solid black;
    box-shadow: 0 10px 10px -5px;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  border: 1.5px solid #1F1C23;
  outline: none;
  color: #1F1C23;
  /* background-color: transparent; */
  /* margin: 40px; */
  white-space: nowrap;

  letter-spacing: 1.5px;
  background: 0 0;
  text-transform: uppercase;
  /* float: right; */
  text-align: center;
  font-weight: 500;

  border-radius: 4px;
  font-size: 18px;
  /* padding: 5px; */
  /* width: 300px; */
  width: 220px;
  transition: all 0.3s;
  /* cursor: pointer; */
  /* margin: 5px;
  margin-bottom: 20px; */
  /* margin: 0px 5px 40px; */
 

  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;

  
  span {
    /* cursor: pointer; */
    display: inline-block;
    position: relative;
    transition: 0.3s;
  }
  
  span:after {
    /* content:"${props => (props.plus ? '\\002B' : '\\00bb')}"; */
    /* content:"${props => (props.plus ? '\\002B' : props.mark)}"; */
    content: '\\2715';
    color:  #0e1111;
    font-weight: 900;



     /* content: "\\002B"; */
    position: absolute;
    opacity: 0;
    top: -5px;
    transform: scale(1.1);
    /* transform: scale(${props => props.scale}); */
    /* transform: rotate(${props => props.rotate}); */
    right: -30px;
    /* left: -30px; */

    transition: 0.3s;
  }
  
  :hover span {
    padding-right: 30px;
  

  }

  :hover span:after {
    opacity: 1;
    right: 0;
  }
`;

const PopupFeedback = styled.div`
  height: 40px;
  width: 170px;
  border: 1px solid #1d2122;
  border-radius: 4px;
  background: #1d2122;
  color: #eaeff0;
  font-size: 15px;
  letter-spacing: 1.2px;
  font-weight: 500;

  padding: 8px 14px;
  opacity: 0;
  position: fixed;
  top: 20%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(100%);

  /* animation: ${popupAppear} 6s cubic-bezier(0.29, 1.03, 0.77, 0.87); */

  animation: ${popupAppear} 4s cubic-bezier(.175,.885,.32,1.275);
`;

const PlanTemplateEdit = ({ location }) => {
  const { plan } = location.state;

  const { updatePlan, removePlan, plans } = useContext(FuncContext);

  const thePlan = plans.find(singlePlan => {
    return singlePlan.id === plan.id;
  });

  const [isEditClicked, setIsEditClicked] = useState(false);

  // setSpecificators(plan.specificators);
  // setPrices(plan.prices);
  // setDailyTasks(plan.dailyTasks);
  const [goalEdit, setGoalEdit] = useState(plan.goal);
  // console.log('plan.deadline', plan.deadline);

  const [planId, setPlanId] = useState(plan.id);

  const [deadlineEdit, setDeadlineEdit] = useState(plan.deadline);

  const [specificatorsEdit, setSpecificatorsEdit] = useState(
    plan.specificators
  );
  const [pricesEdit, setPricesEdit] = useState(plan.prices);
  const [taskEdit, setTaskEdit] = useState(plan.dailyTask);

  // const [tempTaskEdit, setTaskEdit] = useState(plan.dailyTask);

  //ADD NEW POSITION TO THE SPECS/PRICES/DAILY-TASKS
  const [field, setField] = useState('');
  const [newId, setNewId] = useState(uuid());

  const handleAddNewField = () => {
    if (field) {
      setField('');
    }
    setNewId(uuid());
  };

  //END TO ADD NEW POSITION TO THE SPECS/PRICES/DAILY-TASKS

  const newFieldGenerator = fieldType => {
    // console.log('FIELDTYYYYPE:', fieldtype);
    handleAddNewField();
    const id = newId;

    if (fieldType === 'specs') {
      const newSpec = { singleSpec: field, id };
      setSpecificatorsEdit([...specificatorsEdit, newSpec]);
    } else if (fieldType === 'prices') {
      const newPrice = { singlePrice: field, id };
      setPricesEdit([...pricesEdit, newPrice]);
    }
    // else if (fieldType === 'dailyTask') {
    //   const newTask = { dailyTask: field, id };
    //   setTasksEdit([...tasksEdit, newTask]);
    // }
  };

  const deleteSpec = specId => {
    const updatedSpecs = specificatorsEdit.filter(spec => {
      return spec.id !== specId;
    });
    setSpecificatorsEdit(updatedSpecs);
  };

  const deletePrice = priceId => {
    const updatedPrices = pricesEdit.filter(price => {
      return price.id !== priceId;
    });
    setPricesEdit(updatedPrices);
  };

  const handleEdit = () => {
    updatePlan(planId, {
      goal: goalEdit,
      deadline: deadlineEdit.valueOf(), // VALUE OF ???
      specificators: specificatorsEdit,
      prices: pricesEdit,
      dailyTask: taskEdit,
      id: planId
    });
  };

  const [clickedInputId, setClickedInputId] = useState('');

  const [isClicked, setIsClicked] = useState(false);

  const [focused, setFocused] = useState(null);

  const [showModal, setShowModal] = useState('');

  const showCalendar = () => {
    if (!isClicked) setIsClicked(true);
  };

  const hideCalendar = () => {
    if (isClicked) setIsClicked(false);
  };

  const onDateChange = newDeadline => {
    if (newDeadline) {
      setDeadlineEdit(newDeadline);
    }
  };

  const getId = e => {
    setClickedInputId(e.target.id);
    // console.log();
  };

  const editSpec = (idSpec, updatedContent) => {
    const updatedSpecs = specificatorsEdit.map(spec => {
      if (spec.id === idSpec) {
        spec.singleSpec = updatedContent;
      }
      return spec;
    });

    setSpecificatorsEdit(updatedSpecs);
  };

  const editPrice = (idPrice, updatedContent) => {
    const updatedPrices = pricesEdit.map(price => {
      if (price.id === idPrice) {
        price.singlePrice = updatedContent;
      }
      return price;
    });

    setPricesEdit(updatedPrices);
  };

  const editDailyTask = (idDailyTask, updatedContent) => {
    // let uptask = taskEdit.dailyTask;
    // uptask = updatedContent
    let uptask = { dailyTask: updatedContent };
    // const taskEdit.dailyTask = updatedContent;
    setTaskEdit({ ...taskEdit, ...uptask });
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
                <PlanTitle>
                  <InputFieldEdit
                    // textarea
                    value={goalEdit}
                    name="goal"
                    // handleChange={e => setGoalEdit(e.target.value)}
                    setGoalEdit={setGoalEdit}
                    setIsEditClicked={setIsEditClicked}
                    isEditClicked={isEditClicked}
                  />
                </PlanTitle>
                {/* {isEditible && <img src={Feather} alt="feather pen"></img>} */}
                {/* </PlanTitleContainer> */}
              </div>
              <Deadline onClick={showCalendar} onBlur={hideCalendar}>
                <span>Deadline:</span>
                {/* {isClicked ? ( */}
                <SingleDatePicker
                  placeholder={moment(deadlineEdit).format('DD MMM YYYY')}
                  date={moment(deadlineEdit)} // momentPropTypes.momentObj or null
                  onDateChange={date => onDateChange(date)} // PropTypes.func.isRequired
                  focused={focused} // PropTypes.bool
                  onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequiredfunc.isRequired
                  id="mydatepickerr" // PropTypes.string.isRequired,
                  displayFormat={'DD MMM YYYY'}
                  numberOfMonths={1}
                  openDirection="down"
                  hideKeyboardShortcutsPanel={true}
                />
              </Deadline>
              <DescriptionContainer>
                <Details className="descriptor">
                  <span>
                    <SpecificsIcon
                      width="25px"
                      className="descriptorIcon spec"
                    />{' '}
                  </span>
                  <h4>
                    <span className="break">Make </span>
                    <span className="break">It </span>
                    <span className="break">Specific</span>
                  </h4>{' '}
                  <ul>
                    {specificatorsEdit.map(({ singleSpec, id }) => {
                      return (
                        <li
                          key={id}
                          id={id}
                          className={
                            clickedInputId === id ? 'thickBorder' : 'thinBorder'
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
                            // action={singleSpec}
                            action={editSpec}
                            setIsEditClicked={setIsEditClicked}
                            isEditClicked={isEditClicked}
                          />

                          <span
                            className="deleteField"
                            onClick={() => {
                              deleteSpec(id);
                            }}
                          >
                            &#x2715;
                          </span>
                        </li>
                      );
                    })}{' '}
                    {/* ADD NEW FIELD */}
                    <NewField
                      name="specs"
                      onClick={e => {
                        newFieldGenerator(e.target.name);
                      }}
                    >
                      <span>&#43;</span> add new descriptor
                    </NewField>
                  </ul>
                </Details>
                <Price className="descriptor">
                  <span>
                    <PriceIcon width="25px" className="descriptorIcon price" />{' '}
                  </span>
                  <h4>
                    <span className="break">Price </span>
                    <span className="break">To </span>
                    <span className="break">Pay</span>
                  </h4>
                  <ul>
                    {pricesEdit.map(({ singlePrice, id }) => {
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
                            action={editPrice}
                            setIsEditClicked={setIsEditClicked}
                            isEditClicked={isEditClicked}
                          />
                          <span
                            // id={id}
                            className="deleteField"
                            onClick={() => {
                              deletePrice(id);
                            }}
                          >
                            &#x2715;
                          </span>
                        </li>
                      );
                    })}
                    {/* ADD NEW FIELD */}
                    <NewField
                      name="prices"
                      onClick={e => {
                        newFieldGenerator(e.target.name);
                      }}
                    >
                      <span>&#43;</span> add new price
                    </NewField>
                  </ul>
                </Price>
                <div className="break"></div>
                <DailyRegimen className="descriptor">
                  {' '}
                  <span>
                    <Strong width="25px" className="descriptorIcon" />{' '}
                  </span>
                  <h4>
                    <span className="break">Daily </span>
                    <span className="break">regimen</span>
                  </h4>
                  <ul>
                    <li
                      key={taskEdit.id}
                      id={taskEdit.id}
                      // className={`thinBorder ${verticalBorder}`}
                      className={
                        clickedInputId === taskEdit.id
                          ? 'thickBorder'
                          : 'thinBorder'
                      }
                      onClick={getId}
                      onBlur={() => {
                        setClickedInputId('');
                      }}
                      spellcheck="false"
                    >
                      <InputFieldEdit
                        value={taskEdit.dailyTask}
                        id={taskEdit.id}
                        name="dailyTask"
                        textarea
                        action={editDailyTask}
                        setIsEditClicked={setIsEditClicked}
                        isEditClicked={isEditClicked}
                      />
                    </li>
                  </ul>
                </DailyRegimen>
              </DescriptionContainer>

              {/* <PlanStage>
                <Graph />
                <StatText>You are on 20 day stroke.</StatText>
                <GoToPlan></GoToPlan>
              </PlanStage> */}
            </PlanContent>

            <ButtonContainer>
              <DeleteButton
                onClick={() => {
                  setShowModal('active');
                }}
              >
                <span>Delete Plan</span>
              </DeleteButton>

              <EditButton
                onClick={() => {
                  handleEdit();
                  setIsEditClicked(true);
                  // updatePlan()
                }}
              >
                Save Changes
              </EditButton>

              {isEditClicked && <PopupFeedback>Changes Saved</PopupFeedback>}
            </ButtonContainer>
            {/* {showModal && <ModalDeletePlan active />} */}
            {/* {console.log('showModal: ', showModal)} */}
            {/* {showModal && (
              <ModalDeletePlan active={showModal ? 'active' : ''} />
            )} */}

            <ModalDeletePlan
              setShowModal={setShowModal}
              isActive={showModal}
              goal={goalEdit}
              removePlan={removePlan}
              id={plan.id}
            />
            {/* <Button
              mark={'\\2717'}
              content={'Delete Plan'}
              width="220px"
              scale="1.2"
            ></Button> */}
            {/* </InnerBox> */}
          </div>
        </Box>
      </PlanContainer>
    </>
  );
};

export default PlanTemplateEdit;
