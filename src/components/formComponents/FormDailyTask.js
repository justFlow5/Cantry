import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import PlanContext from '../contexts/Plan-context';
import { FuncContext, device } from '../contexts/FunctionsProvider';

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
  @media ${device.mobileS} {
    position: fixed;

    top: 40%;
    left: 19%;
  }
  @media ${device.tablet} {
    top: 40%;
    left: 8%;
  }
`;

const ListContainer = styled.div`
  @media ${device.mobileS} {
    position: relative;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin-top: 45px;
  }

  @media ${device.tablet} {
    margin-top: 17px;
  }
`;

export default () => {
  const { nextStep, prevStep } = useContext(PlanContext);

  const { dailyTask, tempDailyTask, setTempDailyTask, addTask } = useContext(
    FuncContext
  );

  return (
    <>
      <Request
        htmlFor="dailyTask"
        title="Daily task"
        subtext="The key to success is discipline.
        The things you do every day, the things that don't look like they matter, do matter.
        They not only make a difference - they make all the difference. Type a simple, positive action that
        repeated over time will get you closer to achieving your goal: "
      ></Request>
      <InputField
        value={tempDailyTask}
        id="dailyTask"
        name="singleTask"
        action={setTempDailyTask}
        title="Task"
        // setInputLength={setInputLength}
      />

      <AddButton
        addField={addTask}
        disabled={tempDailyTask.length > 5 && !dailyTask ? false : true}
      ></AddButton>
      <br></br>

      <ButtonNextContainer>
        <NavigationArrow
          nextContent="Develop Your Strategy"
          nextStep={nextStep}
          disabled={dailyTask.dailyTask ? false : true}
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
        {dailyTask.dailyTask && (
          <List
            content={dailyTask.dailyTask}
            key={dailyTask.id}
            id={dailyTask.id}
            dataType="task"
          ></List>
        )}
      </ListContainer>
    </>
  );
};
