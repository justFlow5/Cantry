import React, { useContext } from 'react';
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

export default props => {
  const {
    singlePrice,
    setSinglePrice,
    nextStep,
    prevStep,
    addPrice,
    prices
  } = useContext(PlanContext);
  // const next = e => {
  //   e.preventDefault();
  //   props.nextStep();
  // };

  // const back = e => {
  //   e.preventDefault();
  //   props.prevStep();
  // };

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
      <AddButton addField={addPrice}></AddButton>

      {/* <button onClick={nextStep}>Next</button> */}
      {/* <button onClick={prevStep}>Back</button> */}

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
        <ButtonNext
          action={nextStep}
          content="NEXT"
          width="150px"
          mark="\00bb"
          scale="1.3"
          disabled={prices.length > 0 ? false : true}
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

      {/* <button onClick={addPrice}>Add price</button> */}
    </>
  );
};
