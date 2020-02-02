import React, { useContext } from 'react';
import styled from 'styled-components';
import PlanContext from '../Plan-context';
import InputField from './InputField';

import ButtonNext from '../Button';
import Request from './Request';

const ButtonNextContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 30px;
`;

// const Request = styled.label`;
//   cursor: pointer;
//   display: inline-block;
//   .title {
//     font-size: 24px;
//     font-weight: 500;
//     letter-spacing: 1px;
//     text-align: center;
//     color: rgba(0, 0, 0, 0.8);
//   }

//   p {
//     margin: 0px 70px;
//     display: inline-block;
//     text-align: left;
//     font-size: 18px;
//     line-height: 1.4;
//   }
// `;

export default props => {
  const { goal, setGoal, nextStep } = useContext(PlanContext);

  return (
    <>
      {/* <ProgressSteps>
        <ProgressStep label="First Step">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 1!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps> */}
      <Request
        htmlFor="goal"
        title="What do you dream about?"
        subtext="Pick a dream you have, any dream: your dream house, your dream car,
          dream vacation, dream job, dream marriage, dream career. Pick a dream
          that you'd really love to have come true:"
      />

      <InputField value={goal} id="goal" action={setGoal} title="Goal" />
      <ButtonNextContainer>
        <ButtonNext
          action={nextStep}
          content="NEXT"
          width="150px"
          mark="\00bb"
          scale="1.3"
          disabled={goal.length > 4 ? false : true}
        ></ButtonNext>
      </ButtonNextContainer>
      {/* <button onClick={nextStep}>Next</button> */}
      {/* <button onClick={props.addPlan}>Save</button> */}
    </>
  );
};
