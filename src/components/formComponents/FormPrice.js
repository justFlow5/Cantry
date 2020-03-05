import React, { useContext } from 'react';
import styled from 'styled-components';

import PlanContext from '../contexts/Plan-context';
import { FuncContext, device } from '../contexts/FunctionsProvider';

import InputField from './InputField';
import List from './List';
import Request from './Request';

import ButtonNext from '../Button';
import ButtonBack from '../Button2';
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
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 17px;
`;

export default props => {
  const {
    singlePrice,
    setSinglePrice,
    nextStep,
    prevStep,
    addPrice
  } = useContext(PlanContext);

  const { prices } = useContext(FuncContext);

  return (
    <>
      <Request
        htmlFor="price"
        title="Know and Pay the Price"
        subtext="Whatever the dream, whatever the goal, there's a price you'll need to pay, and that means giving up something.
        It may mean letting go of some pleasures for the sake of the pursuit of a longer-term aim:"
      />
      <InputField
        textarea
        value={singlePrice}
        id="price"
        name="singlePrice"
        action={setSinglePrice}
        title="Price"
      />
      <AddButton
        addField={addPrice}
        disabled={singlePrice.length > 5 ? false : true}
      ></AddButton>

      <br></br>

      <ListContainer>
        {prices.map(({ singlePrice, id }) => {
          console.log('price: '.price);
          return (
            <List
              content={singlePrice}
              key={id}
              id={id}
              dataType="price"
            ></List>
          );
        })}
      </ListContainer>

      <ButtonNextContainer>
        <NavigationArrow
          nextContent={`Set Daily Tasks`}
          nextStep={nextStep}
          disabled={prices.length > 0 ? false : true}
          arrowDirection="right"
        />
      </ButtonNextContainer>

      <ButtonBackContainer>
        <NavigationArrow
          nextContent="Make It Specific"
          nextStep={prevStep}
          arrowDirection="left"
        />
      </ButtonBackContainer>
    </>
  );
};
