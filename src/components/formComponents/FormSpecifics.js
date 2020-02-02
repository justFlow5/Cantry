import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import PlanContext from '../Plan-context';
import InputField from './InputField';
import List from './List';
import Request from './Request';

import ButtonNext from '../Button';
import ButtonBack from '../Button2';
import AddButton from './AddInputButton';
// import ListContainer from './listContainer';

const ListContainer = styled.div`
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 17px;
`;

const ButtonNextContainer = styled.div`
  position: absolute;
  bottom: -120px;
  /* bottom: -30px; */
  right: 175px;

  > button {
    position: absolute;
  }
`;

const ButtonBackContainer = styled.div`
  position: absolute;
  bottom: -120px;

  left: 30px;
  > button {
    position: absolute;
  }
`;

// const Descriptors = styled.div`
//   font-size: 20px;
//   position: relative;
//   max-width: 300px;

//   /* width: 300px; */
//   margin: 20px;
//   -webkit-transform: rotate(1deg);
//   -moz-transform: rotate(1deg);
//   -ms-transform: rotate(1deg);
//   -o-transform: rotate(1deg);
//   transform: rotate(1deg);

//   &::before,
//   &::after {
//     content: ' ';
//     position: absolute;
//     z-index: 100;
//   }

//   &::before {
//     background: rgba(0, 0, 0, 0.3);
//     bottom: 2px;
//     left: 4px;
//     max-height: 60px;
//     max-width: 180px;
//     height: 70%;
//     width: 90%;

//     -webkit-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
//     -moz-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
//     -ms-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
//     -o-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
//     box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);

//     -webkit-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
//     -moz-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
//     -ms-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
//     -o-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
//     transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
//   }

//   &::after {
//     background: rgba(0, 0, 0, 0.1);
//     height: 30%;
//     max-height: 30px;
//     max-width: 60px;
//     right: 1px;
//     top: 0px;
//     width: 30%;

//     -webkit-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
//     -moz-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
//     -ms-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
//     -o-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
//     box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);

//     -webkit-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
//     -moz-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
//     -ms-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
//     -o-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
//     transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
//   }
// `;
// const SingleDescriptor = styled.div`
//   padding: 10px;
//   min-height: 100px;
//   background: #fff799;
//   z-index: 1000;
//   position: relative;
//   -webkit-transform: rotate(-1deg);
//   -moz-transform: rotate(-1deg);
//   -ms-transform: rotate(-1deg);
//   -o-transform: rotate(-1deg);
//   transform: rotate(-1deg);

//   /* & + li {
//     border-top: 1px solid rgba(255, 255, 255, 0.2);
//   } */
// `;

const Cont = styled.div`
  position: relative;
`;

export default props => {
  const {
    singleSpec,
    setSingleSpec,
    specificators,
    nextStep,
    prevStep,
    addSpec
  } = useContext(PlanContext);

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
      {/* <Cont> */}
      <AddButton addField={addSpec}></AddButton>
      {/* </Cont> */}

      <br></br>
      {/* {<div>hello: {JSON.stringify(specificators)}</div>} */}
      {/* <button onClick={nextStep}>Next</button> */}
      {/* <button onClick={prevStep}>Back</button> */}
      {/* <button onClick={addSpec}>add spec</button> */}

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

      {/* <button onClick={addSpec}>Add specificator</button> */}
      <ListContainer>
        {specificators.map(({ singleSpec, id }) => {
          // const id = Math.random().toString();
          return (
            <List content={singleSpec} key={id} id={id} dataType="spec"></List>
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
          disabled={specificators.length > 0 ? false : true}
        ></ButtonNext>
      </ButtonNextContainer>
    </>
  );
};
