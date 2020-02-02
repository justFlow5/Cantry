import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import PlanContext from '../Plan-context';

import InputField from './InputField';

import List from './List';
import Request from './Request';

import ButtonNext from '../Button';
import ButtonBack from '../Button2';
import AddButton from './AddInputButton';

const ButtonNextContainer = styled.div`
  position: absolute;
  bottom: -70px;

  right: 175px;

  > button {
    position: absolute;
  }
`;

const ButtonBackContainer = styled.div`
  position: absolute;
  bottom: -70px;

  left: 30px;
  > button {
    position: absolute;
  }
`;

const ListContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export default () => {
  const {
    nextStep,
    prevStep,
    dailyTask,
    setDailyTask,
    dailyTasks,
    addTask,
    addPlan
  } = useContext(PlanContext);

  // const [inputLength, setInputLength] = useState(0);

  // window.addEventListener('keydown', e => {
  //   console.log(dailyTask.length);
  //   if (e.keyCode === 13 && dailyTask.length > 3) {
  //     console.log('************************GOES THROUGH!&&&&&&&&&&&&&&&&&&&');
  //     addTask(e);
  //   }
  // });

  return (
    <>
      <Request
        htmlFor="dailyTask"
        title="Daily task"
        subtext="The key to success is discipline.
        The things you do every day, the things that don't look like they matter, do matter.
        They not only make a difference - they make all the difference. Type a simple, positive action/actions that
        repeated over time will get you closer to achieving your goal: "
      ></Request>
      <InputField
        value={dailyTask}
        id="dailyTask"
        name="singleTask"
        action={setDailyTask}
        title="Task"
        // setInputLength={setInputLength}
      />
      <AddButton addField={addTask}></AddButton>
      <br></br>
      {/* <button onClick={nextStep}>Next</button> */}
      {/* <button onClick={prevStep}>Back</button> */}
      <ButtonNextContainer>
        <ButtonNext
          action={nextStep}
          content="NEXT"
          width="150px"
          mark="\00bb"
          scale="1.3"
          disabled={dailyTasks.length > 0 ? false : true}
        ></ButtonNext>
      </ButtonNextContainer>
      <ButtonBackContainer>
        <ButtonBack
          rotate="180deg"
          action={prevStep}
          content="BACK"
          width="150px"
          mark="\00bb"
          scale="3"
        ></ButtonBack>
      </ButtonBackContainer>
      {/* <button onClick={addTask}>Add Daily Task</button> */}

      {/* <button onClick={addPlan}>Save plan</button> */}
      <ListContainer>
        {dailyTasks.map(({ dailyTask, id }) => {
          return (
            <List content={dailyTask} key={id} id={id} dataType="task"></List>
          );
        })}
      </ListContainer>
    </>
  );
};
