import React, { useState, useRef, useContext } from 'react';
import { Link } from '@reach/router';
import uuid from 'uuid';

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
import ProgressIcon from '../icons/ProgressIcon';
import CheckInput from '../CheckInput';
import FeatherIcon from '../icons/Feather';
import Button from '../Button';

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
  padding: 15px 30px 0px;
  height: 60px;
  text-align: center;
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
  margin: 30px 0 15px;
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
    padding: 40px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #8e8e8e;

    /* &:last-child {
      border-bottom: none;
    } */
    /* margin: 30px auto 0; */

    /* flex: 1 1 0; */

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
  width: 200px;
  display: inline-block;
  /* margin: 0px auto; */
  /* background-color:  */
  color: #c2c2c2;
  background-color: rgba(247, 247, 247, 1);
  position: relative;
  /* top: -5px; */
  left: 15px;
  letter-spacing: 1.5px;
  font-size: 11px;
  text-transform: uppercase;
  transition: all 0.3s;
  border: 1px solid #c2c2c2;
  border-radius: 10px;
  padding: 10px 15px 10px 20px;
  text-align: left;
  cursor: pointer;

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
  margin-top: 110px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

  animation: ${popupAppear} 5s cubic-bezier(.175,.885,.32,1.275);
`;

const PlanTemplateEdit = ({ location }) => {
  const { plan } = location.state;

  const { updatePlan, removePlan } = useContext(FuncContext);

  const [isEditClicked, setIsEditClicked] = useState(false);

  // setSpecificators(plan.specificators);
  // setPrices(plan.prices);
  // setDailyTasks(plan.dailyTasks);
  const [goalEdit, setGoalEdit] = useState(plan.goal);
  console.log('plan.deadline', plan.deadline);

  const [planId, setPlanId] = useState(plan.id);

  const [deadlineEdit, setDeadlineEdit] = useState(plan.deadline);

  const [specificatorsEdit, setSpecificatorsEdit] = useState(
    plan.specificators
  );
  const [pricesEdit, setPricesEdit] = useState(plan.prices);
  const [tasksEdit, setTasksEdit] = useState(plan.dailyTasks);

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
    } else if (fieldType === 'dailyTasks') {
      const newTask = { dailyTask: field, id };
      setTasksEdit([...tasksEdit, newTask]);
    }
  };

  // const addField = (type, content) => {
  //   const id = uuid();

  //   if (type === 'specs') {
  //     const newField = { singleSpec: content, id };

  //     setSpecificatorsEdit([...specificatorsEdit, newField]);
  //   } else if (type === 'prices') {
  //     const newField = { singlePrice: content, id };
  //     setPricesEdit([...pricesEdit, newField]);
  //   } else if (type === 'dailyTasks') {
  //     const newField = { dailyTask: content, id };
  //     setTasksEdit([...tasksEdit, newField]);
  //   }
  // };

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

  const deleteDailyTask = dailyTaskId => {
    const updatedDailyTasks = tasksEdit.filter(dailyTask => {
      return dailyTask.id !== dailyTaskId;
    });
    setTasksEdit(updatedDailyTasks);
  };

  const handleEdit = () => {
    updatePlan(planId, {
      goal: goalEdit,
      deadline: deadlineEdit.valueOf(), // VALUE OF ???
      specificators: specificatorsEdit,
      prices: pricesEdit,
      dailyTasks: tasksEdit,
      id: plan.id
    });
  };

  const [verticalBorder, setVerticalBorder] = useState('');

  const [clickedInputId, setClickedInputId] = useState('');

  const [superNewDeadline, setSuperNewDeadline] = useState('');

  const [isClicked, setIsClicked] = useState(false);

  const [focused, setFocused] = useState(null);

  const [showModal, setShowModal] = useState('');

  const buttonContent = useRef(null);

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
    console.log();
  };

  // const formatGoal = str => str.replace(/\W+/g, '-').toLowerCase();

  // const editSpec = (idSpec, updatedContent) => {
  //   specificatorsEdit.forEach(spec => {
  //     if (spec.id === idSpec) {
  //       spec.singleSpec = updatedContent;
  //     }
  //   });
  // };

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

  const editDailyTasks = (idDailyTask, updatedContent) => {
    const updatedDailyTasks = tasksEdit.map(task => {
      if (task.id === idDailyTask) {
        task.dailyTask = updatedContent;
      }
      return task;
    });

    setTasksEdit(updatedDailyTasks);
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

                {/* <div>
                  {specificatorsEdit.map(spec =>
                    JSON.stringify(spec.singleSpec)
                  )}
                </div> */}
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
                            // action={() => {
                            //   handleInputChange(id, 'spec');
                            // }}
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
                    <PriceIcon width="25px" className="descriptorIcon" />{' '}
                  </span>
                  <h4> Price to pay:</h4>
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
                    <ProgressIcon width="25px" className="descriptorIcon" />{' '}
                  </span>
                  <h4>Daily regimen</h4>
                  <ul>
                    {tasksEdit.map(({ dailyTask, id }) => {
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
                            action={editDailyTasks}
                            setIsEditClicked={setIsEditClicked}
                            isEditClicked={isEditClicked}
                          />
                          <span
                            className="deleteField"
                            onClick={() => {
                              deleteDailyTask(id);
                            }}
                          >
                            &#x2715;
                          </span>
                        </li>
                      );
                    })}
                    {/* ADD NEW FIELD */}
                    <NewField
                      name="dailyTasks"
                      onClick={e => {
                        newFieldGenerator(e.target.name);
                      }}
                    >
                      <span>&#43;</span> add new task
                    </NewField>
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
