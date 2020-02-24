import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PlanContext from '../contexts/Plan-context';
import { FuncContext } from '../contexts/FunctionsProvider';
import InputField from './InputField';

import Request from './Request';

import NavigationArrow from './NavigationArrow';

const ButtonNextContainer = styled.div`
  position: fixed;
  top: 40%;
  right: 1%;
`;

export default props => {
  const { nextStep } = useContext(PlanContext);
  const { goal, setGoal } = useContext(FuncContext);

  const [inputFilled, setInputFilled] = useState(false);

  return (
    <>
      <Request
        htmlFor="goal"
        title="What do you dream about?"
        subtext="Pick a dream you have, any dream: your dream house, your dream car,
          dream vacation, dream job, dream marriage, dream career. Pick a dream
          that you'd really love to have come true:"
      />

      <InputField value={goal} id="goal" action={setGoal} title="Goal" />
      <ButtonNextContainer>
        <NavigationArrow
          nextContent="Make It Specific"
          nextStep={nextStep}
          disabled={goal.length > 6 ? false : true}
          arrowDirection="right"
        />
      </ButtonNextContainer>
    </>
  );
};
