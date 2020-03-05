import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import PlanContext from '../contexts/Plan-context';
import { FuncContext, device } from '../contexts/FunctionsProvider';

import InputField from './InputField';

import List from './List';
import Request from './Request';

import AddButton from './AddInputButton';
import RadioButtons from './RadioButtons';

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
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 17px;
`;

const RadioButtonContainer = styled.div`
  position: absolute;
  z-index: 900;
  right: 31%;
  /* top: 83%; */
  display: flex;
`;

const Header = styled.span`
  @media ${device.mobileS} {
    font-size: 12px;
    color: #333333;
    letter-spacing: 0.3px;
    position: absolute;
    right: 33px;
    font-weight: 600;
    /* position: absolute;
  top: -10px; */
  }

  @media ${device.mobileL} {
    font-size: 13px;
  }

  @media ${device.tablet} {
    font-size: 12px;
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }
`;

export default () => {
  const {
    nextStep,
    prevStep,

    singlePlanJob,
    setSinglePlanJob,
    addSinglePlanJob,

    singlePlanJobDifficulty,
    setSinglePlanJobDifficulty
  } = useContext(PlanContext);

  const { planJobs } = useContext(FuncContext);

  const [checkedValueOne, setCheckedValueOne] = useState(true);
  const [checkedValueTwo, setCheckedValueTwo] = useState(false);
  const [checkedValueThree, setCheckedValueThree] = useState(false);

  const handleChange = () => {
    setCheckedValueOne(true);
    setCheckedValueTwo(false);
    setCheckedValueThree(false);
  };

  return (
    <>
      <Request
        htmlFor="singlePlanJob"
        title="Strategy"
        subtext='Start with a strategy. Just list all the things that need to be done before
        crossing the finish line. So once you completed each and every one of them, you can finally claim
        with full certainity \"I have accomplished my goal\". Think of it as listing tasks that when individually completed -
        will get you gradually closer to achieving your goal.'
      ></Request>
      <InputField
        textarea
        value={singlePlanJob}
        id="singleJob"
        name="singleJob"
        action={setSinglePlanJob}
        title="strategy component"
        // setInputLength={setInputLength}
      />
      {/* <div>planJobs: {JSON.stringify(planJobs)}</div> */}
      {/* <ButtonContainer> */}
      <RadioButtonContainer>
        <Header>Difficulty evaluation of task:</Header>
        <RadioButtons
          setSinglePlanJobDifficulty={setSinglePlanJobDifficulty}
          checkedValueOne={checkedValueOne}
          setCheckedValueOne={setCheckedValueOne}
          checkedValueTwo={checkedValueTwo}
          setCheckedValueTwo={setCheckedValueTwo}
          checkedValueThree={checkedValueThree}
          setCheckedValueThree={setCheckedValueThree}
        />
      </RadioButtonContainer>
      {/* <div>singlePlanJobDifficulty: {singlePlanJobDifficulty}</div> */}

      <AddButton
        addField={addSinglePlanJob}
        handleChange={handleChange}
        disabled={singlePlanJob.length > 5 ? false : true}
      ></AddButton>
      {/* </ButtonContainer> */}
      <br></br>

      <ButtonNextContainer>
        <NavigationArrow
          nextContent="Set Deadline"
          nextStep={nextStep}
          disabled={planJobs.length > 0 ? false : true}
          arrowDirection="right"
        />
      </ButtonNextContainer>
      <ButtonBackContainer>
        <NavigationArrow
          nextContent="Set Daily Tasks"
          nextStep={prevStep}
          arrowDirection="left"
        />
      </ButtonBackContainer>
      <ListContainer>
        {planJobs.map(planJob => {
          return (
            <List
              content={planJob.singlePlanJob}
              key={planJob.id}
              id={planJob.id}
              dataType="job"
              difficulty={planJob.difficulty}
              //   singlePlanJobDifficulty={singlePlanJobDifficulty}
            ></List>
          );
        })}
      </ListContainer>
    </>
  );
};
