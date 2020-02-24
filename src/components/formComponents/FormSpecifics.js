import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import PlanContext from '../contexts/Plan-context';
import { FuncContext } from '../contexts/FunctionsProvider';

import InputField from './InputField';
import List from './List';
import Request from './Request';

import AddButton from './AddInputButton';

import NavigationArrow from './NavigationArrow';

// import ListContainer from './listContainer';

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
export default props => {
  const { singleSpec, setSingleSpec, nextStep, prevStep, addSpec } = useContext(
    PlanContext
  );

  const { specificators } = useContext(FuncContext);

  return (
    <>
      <Request
        htmlFor="spec"
        title="Make it specific"
        subtext="Add whatever wording you need to make your goal absolutely specific. 
        Describe exactly how you'd feel,
         what kinds of activities you'd engage in and what they'd feel like. The more the better:"
      />

      <InputField
        textarea
        value={singleSpec}
        id="spec"
        action={setSingleSpec}
        title="Descriptor"
      />

      <AddButton
        addField={addSpec}
        disabled={singleSpec.length > 5 ? false : true}
      ></AddButton>

      <br></br>

      <ButtonNextContainer>
        <NavigationArrow
          nextContent="Pay The Price"
          nextStep={nextStep}
          disabled={specificators.length > 0 ? false : true}
          arrowDirection="right"
        />
      </ButtonNextContainer>

      <ButtonBackContainer>
        <NavigationArrow
          nextContent="Set Your Goal"
          nextStep={prevStep}
          arrowDirection="left"
        />
      </ButtonBackContainer>

      <ListContainer>
        {specificators.map(({ singleSpec, id }) => {
          return (
            <List content={singleSpec} key={id} id={id} dataType="spec"></List>
          );
        })}
      </ListContainer>
    </>
  );
};
