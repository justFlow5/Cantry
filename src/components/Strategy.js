import React, { useState, useEffect, useContext, useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PlanContext from './contexts/Plan-context';
import NavBar from './Navbar';
import ProgressBar from './ProgressBar';
import Correct from './icons/Correct';
import uuid from 'uuid';
import { FuncContext } from './contexts/FunctionsProvider';

import Confetti from 'react-confetti';

import InputFieldJobs from './formComponents/InputFieldJobs';
import RadioButtons from './formComponents/RadioButtonsEdit';

// import correctIcon from '../images/correct.svg';
import correctIcon from '../images/correct.svg';

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

const Container = styled.div`
  width: 95%;
  /* height: 100%; */
  /* margin: calc(50px + 20px) 5%; */
  margin-top: 70px;

  position: relative;
  display: flex;
`;

const TaskContainer = styled.div`
  margin: 0 auto;
  padding: 55px 20px;
  position: relative;
  width: 550px;
  min-height: 550px;
  /* min-height: au; */
  background: #dadada;
  border: 1px solid #c0c0c0;
  border-radius: 15px;
  color: #3c3232;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;

  /* -webkit-box-shadow: 0px 10px 40px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 40px -11px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 40px -11px rgba(0, 0, 0, 0.75); */
  clip-path: polygon(
    3% 0,
    7% 1%,
    11% 0%,
    16% 2%,
    20% 0,
    23% 2%,
    28% 2%,
    32% 1%,
    35% 1%,
    39% 3%,
    41% 1%,
    45% 0%,
    47% 2%,
    50% 2%,
    53% 0,
    58% 2%,
    60% 2%,
    63% 1%,
    65% 0%,
    67% 2%,
    69% 2%,
    73% 1%,
    76% 1%,
    79% 0,
    82% 1%,
    85% 0,
    87% 1%,
    89% 0,
    92% 1%,
    96% 0,
    98% 3%,
    99% 3%,
    99% 6%,
    100% 11%,
    98% 15%,
    100% 21%,
    99% 28%,
    100% 32%,
    99% 35%,
    99% 40%,
    100% 43%,
    99% 48%,
    100% 53%,
    100% 57%,
    99% 60%,
    100% 64%,
    100% 68%,
    99% 72%,
    100% 75%,
    100% 79%,
    99% 83%,
    100% 86%,
    100% 90%,
    99% 94%,
    99% 98%,
    95% 99%,
    92% 99%,
    89% 100%,
    86% 99%,
    83% 100%,
    77% 99%,
    72% 100%,
    66% 98%,
    62% 100%,
    59% 99%,
    54% 99%,
    49% 100%,
    46% 98%,
    43% 100%,
    40% 98%,
    38% 100%,
    35% 99%,
    31% 100%,
    28% 99%,
    25% 99%,
    22% 100%,
    19% 99%,
    16% 100%,
    13% 99%,
    10% 99%,
    7% 100%,
    4% 99%,
    2% 97%,
    1% 97%,
    0% 94%,
    1% 89%,
    0% 84%,
    1% 81%,
    0 76%,
    0 71%,
    1% 66%,
    0% 64%,
    0% 61%,
    0% 59%,
    1% 54%,
    0% 49%,
    1% 45%,
    0% 40%,
    1% 37%,
    0% 34%,
    1% 29%,
    0% 23%,
    2% 20%,
    1% 17%,
    1% 13%,
    0 10%,
    1% 6%,
    1% 3%
  );

  & form {
    display: flex;

    & .radioGroup {
      margin: 0 0 15px auto;
      position: relative;
    }
  }
`;

const Header = styled.h3`
  margin: 0 auto;
  color: #3c3232;
  letter-spacing: 0.5px;
  font-size: 28px;
  width: 90%;
  text-align: center;
`;

const ListOfTasksContainer = styled.ul`
  margin: 20px 50px;
  list-style-type: none;
  position: relative;
`;

const ListOfTasksItem = styled.li`
  /* padding: 10px 10px; */
  padding: 30px 10px 5px;
  /* margin-left: 30px; */
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border-radius: 5px;
  border: 1px solid transparent;
  flex-wrap: wrap;

  transition: all 0.3s;


  /* &:last-child {
    justify-content: column;
  } */

  & hr {
    border: 0;
    height: 1px;
    /* background-image: linear-gradient(90deg, #8c8b8b, #585858, #8c8b8b); */
    background-image: linear-gradient(90deg, #C8C8C8, #585858, #C8C8C8);
    margin-top: 5px;
    position: relative;
    margin-top: 15px;
    width: 100%;
   
  }

  &:hover {
    background: rgba(255, 255, 255, 0.54);
    border: 1px solid white;
  }


  & .checkbox {
    width: 12px;
    height: 12px;
    border: 2px solid rgba(0, 0, 0, 0.54);
    /* border: 2px solid #43a047; */
    background: none;
    
    border-radius: 3px;
    padding: 11px;
    position: relative;
    box-shadow: 0 0 0 0px rgba(69, 253, 77, 0.4);

    /* background: #8cff1a; */
    /* background: #43a047; */
  

    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    &.marked {
        box-shadow: 0 0 0 15px rgba(69, 253, 77, 0);
        background: #45fd4d;
    border: 2px solid #45fd4d;
    }
    

    & > svg {
        position: absolute;
    padding: 1px;
    width: 19px;
    left: 1px;
    top: 0;
    display: none;

    &.marked {
        display: initial;
    }
    /* stroke-width: 2; */
    
   
    }

    /* } */
    /* background-image: url(${correctIcon}); */
    /* background-image: {Correct}; */

    /* &::before {
      content: '\\2714';
      position: absolute;
      top: -3px;
      left: 1px; */
    /* bottom: 0;
      left: 0; */
    /* background: green; */
    /* display: none; */
    /* } */

    /* text-align: center; */
  }

  & .taskText {
    font-size: 17px;
    color: #3c3232;
    padding-top: 2px;
    margin: 0 10px 0 15px;
    word-wrap: break-word;
    position: relative;
    padding-left: 25px;
    align-self: flex-start;
    top: -30px;
    margin-bottom: -30px;
    /* word-break: break-all; */

    & span {
        position: absolute;
        top: -20px;
        /* left: 5px; */
        /* right: 0; */
      display: flex;

      & img {
        width: 20px;
        height: 20px;
      }
    }
  }

  /* &.marked {
    text-decoration: line-through;
  } */

`;

const ButtonContainer = styled.div`
  margin-top: auto;

  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const EditButton = styled.button`
  width: 170px;
  height: 40px;
  /* color: #e2e2e2; */
  color: #eaeff0;
  border: 1px solid #1d2122;
  border-radius: 4px;
  background-color: #1d2122;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  /* letter-spacing: 0.34px; */
  letter-spacing: 0.5px;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;
  bottom: -20px;
  right: 20px;
  justify-self: end;

  transition: all 0.3s;

  &[disabled],
  &[disabled]:hover,
  &[disabled]:focus,
  &[disabled]:active {
    /* pointer-events: none; */
    cursor: not-allowed;
    color: #eaeff0;
    box-shadow: none;

    /* color: #eaeff0; */
  }

  &:hover {
    color: #b1b1b1;
    border: 1px solid black;
    box-shadow: 0 10px 10px -5px;
  }
`;

const NewField = styled.button`
  width: 200px;
  display: inline-block;
  /* margin: 0px auto; */
  /* background-color:  */
  color: #666666;
  background-color: transparent;
  position: relative;
  /* top: 10px; */
  /* left: 40px; */
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;
  border: 1px solid #666666;
  border-radius: 10px;
  padding: 10px 15px 10px 20px;
  text-align: left;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 60px;

  transition: all 0.3s;

  & > span {
    font-size: 16px;
    position: absolute;
    left: 2.5%;
    top: 25%;
  }

  &:hover {
    color: black;
    border: 1px solid black;

    /* font-weight: 700; */
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

const ProgressBarContainer = styled.div`
  width: 40%;
  margin: 0px auto;
  position: relative;
`;

const Strategy = ({ location }) => {
  //   const { planJobs } = location.state;
  //   const {
  // singlePlanJob,
  // setSinglePlanJob,
  // addSinglePlanJob,
  // singlePlanJobDifficulty,
  // setSinglePlanJobDifficulty
  //   } = useContext(PlanContext);
  //   const planJobsEdit = location.state.planJobs;

  const { planJobs, setPlanJobs, updatePlanJobs } = useContext(FuncContext);

  const [planJobsEdit, setPlanJobsEdit] = useState(location.state.planJobs);
  const [deadline, setDeadline] = useState(location.state.deadline);
  const [id, setId] = useState(location.state.id);

  const editButton = useRef(null);

  const [buttonText, setButtonText] = useState('edit');

  const [isEditible, setIsEditible] = useState(false);

  const [isDataSaved, setIsDataSaved] = useState(false);

  const [field, setField] = useState('');
  const [newId, setNewId] = useState(uuid());

  const [isDisabled, setIsDisabled] = useState(false);

  //   CONFETTI
  //   const size = useWindowSize();
  const [isGoalAccomplished, setIsGoalAccomplished] = useState(false);

  const isFieldsFilled = fields => {
    fields.every(planJob => {
      return planJob.singlePlanJob.length > 0;
    });
  };

  const handleAddNewField = () => {
    if (field) {
      setField('');
    }
    setNewId(uuid());
  };

  const newFieldGenerator = () => {
    // console.log('FIELDTYYYYPE:', fieldtype);
    handleAddNewField();
    const id = newId;
    const newField = { singlePlanJob: field, completed: false, id };

    setPlanJobsEdit([...planJobsEdit, newField]);
  };

  const deletePlanJob = planJobId => {
    const updatedPlanJobs = planJobsEdit.filter(planJob => {
      return planJob.id !== planJobId;
    });
    setPlanJobsEdit(updatedPlanJobs);
  };

  useEffect(() => {
    if (isEditible) {
      //   editButton.current.innerText = 'Save Changes';
      setButtonText('Save Changes');
      if (isDataSaved) setIsDataSaved(false);
    } else if (!isEditible) {
      //   editButton.current.innerText = 'Edit';
      if (!isDataSaved && buttonText === 'Save Changes') {
        setIsDataSaved(true);
        setButtonText('Edit');

        //   if (!isDataSaved && buttonText === 'Save Changes') setIsDataSaved(true);
      }
    }
  }, [isEditible]);

  const editPlanJobs = (idPlanJob, updatedContent) => {
    const updatedPlanJobs = planJobsEdit.map(planJob => {
      if (planJob.id === idPlanJob) {
        if (updatedContent.type === 'text') {
          planJob.singlePlanJob = updatedContent.content;
        } else if (updatedContent.type === 'difficulty') {
          planJob.difficulty = updatedContent.content;
        } else if (updatedContent.type === 'completed') {
          planJob.completed = updatedContent.content;
        }
      }
      return planJob;
    });

    updatePlanJobs(id, updatedPlanJobs);
    // if (isFieldsFilled(updatedPlanJobs)) {
    //   setPlanJobsEdit(updatedPlanJobs);
    //   if (isDisabled) {
    //     setIsDisabled(false);
    //   }
    // } else {
    //   if (isDisabled) setIsDisabled(true);
    // }
  };

  //   const handleAddNewField = () => {

  //   const deleteDailyTask = dailyTaskId => {
  //     const updatedDailyTasks = tasksEdit.filter(dailyTask => {
  //       return dailyTask.id !== dailyTaskId;
  //     });
  //     setTasksEdit(updatedDailyTasks);
  //   };

  //   const handleEdit = () => {
  //     updatePlan(planId, {
  //       goal: goalEdit,
  //       deadline: deadlineEdit.valueOf(), // VALUE OF ???
  //       specificators: specificatorsEdit,
  //       prices: pricesEdit,
  //       dailyTasks: tasksEdit,
  //       id: planId
  //     });
  //   };

  //   const handleCheck = () => {
  //     clickedInputId === item.id ? isMarked : '';
  //     if (clickedInputId === item.id && item.completed) {
  //     }
  //   };

  const currentProgress = () => {
    //   weighted average: low difficulty: 1 | medium: 3 | high : 5
    let nominator = 0;
    let denominator = 0;
    // const completedTasks = planJobsEdit.filter(planJob => {
    //   return planJob.completed === true;
    // });

    planJobsEdit.forEach(planJob => {
      if (planJob.difficulty === 1) {
        denominator += 1;

        if (planJob.completed) {
          nominator += 1;
        }
      } else if (planJob.difficulty === 2) {
        denominator += 2;
        if (planJob.completed) {
          nominator += 2;
        }
      } else if (planJob.difficulty === 3) {
        denominator += 3;
        if (planJob.completed) {
          nominator += 3;
        }
      }
    });

    return Math.floor((nominator / denominator) * 100);
  };

  const checkPlan = () => {
    const isAccomplished = planJobsEdit.every(planJob => {
      return planJob.completed;
    });
    setIsGoalAccomplished(isAccomplished);
  };

  // const handleDisabled = () => {
  //   const isFilled = planJobsEdit.every(planJob => {
  //     return planJob.length > 0 && planJob.difficulty;
  //   });

  //   if (buttonText === 'save changes') {
  //     return isFilled;
  //   }
  // };

  return (
    <>
      <NavBar />
      {isDataSaved && <PopupFeedback>Changes Saved</PopupFeedback>}
      <Container>
        <TaskContainer>
          <Header>Task to complete:</Header>
          <ListOfTasksContainer>
            {planJobsEdit.map(item => {
              let fire = [];
              for (let i = 0; i < item.difficulty; i++) {
                fire.push(<img src="/fire.png" alt={'black fire'} />);
              }

              if (isEditible) {
                return (
                  <div className="inputContainer">
                    <InputFieldJobs
                      textarea
                      deletePlanJob={deletePlanJob}
                      id={item.id}
                      value={item.singlePlanJob}
                      action={editPlanJobs}
                    />
                    <RadioButtons
                      //   setSinglePlanJobDifficulty={setSinglePlanJobDifficulty}

                      difficulty={item.difficulty}
                      id={item.id}
                      editPlanJobs={editPlanJobs}
                    />
                    {/* <span className="difficulty">{fire}</span>{' '} */}
                  </div>
                );
              } else {
                return (
                  <ListOfTasksItem
                    id={item.id}
                    key={item.id}
                    onClick={() => {
                      item.completed = !item.completed;
                      setPlanJobsEdit([...planJobsEdit]);
                      editPlanJobs();
                      checkPlan(item.id, item.completed);
                    }}
                  >
                    <div
                      className={`checkbox ${item.completed ? 'marked' : ''}`}
                    >
                      {/* <img src={correctIcon} /> */}
                      <Correct
                        className={`${item.completed ? 'marked' : ''}`}
                      />
                    </div>
                    <p className="taskText" key={item.id} id={item.id}>
                      {item.singlePlanJob}
                      {/* HERE IS THE PLACE FOR FIREEEE - absolute fire hehe */}
                      <span className="difficulty">{fire}</span>
                    </p>

                    <hr />
                  </ListOfTasksItem>
                );
              }
            })}
            {isEditible && (
              <NewField
                name="planJobs"
                onClick={e => {
                  newFieldGenerator(e.target.name);
                }}
              >
                <span>&#43;</span> add new task
              </NewField>
            )}
          </ListOfTasksContainer>

          {!isEditible && (
            <ProgressBarContainer>
              <ProgressBar progress={currentProgress()} deadline={deadline} />
            </ProgressBarContainer>
          )}
          <ButtonContainer>
            <EditButton
              // disabled={!handleDisabled()}
              ref={editButton}
              onClick={() => {
                setIsEditible(!isEditible);
                if (isDataSaved) {
                  setPlanJobs(planJobsEdit);
                }
              }}
              disabled={isDisabled}
            >
              {buttonText}
            </EditButton>
          </ButtonContainer>
        </TaskContainer>{' '}
        {/* CONFETTI */}
        {isGoalAccomplished && (
          <Confetti
            width={document.documentElement.scrollWidth}
            // height={size.height}
            height={document.documentElement.scrollHeight}
            numberOfPieces={350}
          />
        )}
      </Container>
    </>
  );
};

export default Strategy;
