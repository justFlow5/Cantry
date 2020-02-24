import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import PlanContext from '../contexts/Plan-context';
import { FuncContext } from '../contexts/FunctionsProvider';

import InputField from './InputField';

import List from './List';
import Request from './Request';

import AddButton from './AddInputButton';

import NavigationArrow from './NavigationArrow';

const ButtonNextContainer = styled.div`
  position: fixed;
  top: 40%;
  right: 1%;
`;

const ButtonBackContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 8%;
`;

const ListContainer = styled.div`
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 17px;
`;

export default () => {
  const { nextStep, prevStep, dailyTask, setDailyTask, addTask } = useContext(
    PlanContext
  );

  const { dailyTasks } = useContext(FuncContext);

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

      <AddButton
        addField={addTask}
        disabled={dailyTask.length > 5 ? false : true}
      ></AddButton>
      <br></br>

      <ButtonNextContainer>
        <NavigationArrow
          nextContent="Set Deadline"
          nextStep={nextStep}
          disabled={dailyTasks.length > 0 ? false : true}
          arrowDirection="right"
        />
      </ButtonNextContainer>
      <ButtonBackContainer>
        <NavigationArrow
          nextContent="Pay The Price"
          nextStep={prevStep}
          arrowDirection="left"
        />
      </ButtonBackContainer>
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
