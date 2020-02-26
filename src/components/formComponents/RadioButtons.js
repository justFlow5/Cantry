import React, { useState, useContext } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  font-size: 13px;
  & > .radioGroup {
    border: solid 2px #333333;
    display: inline-block;
    margin: 20px;
    border-radius: 7px;
    overflow: hidden;
    position: relative;
    /* position: absolute;
    top: -10px; */
  }
`;
const Input = styled.input`
  &[type='radio'] {
    position: absolute;
    visibility: hidden;
    display: none;

    &:checked + label {
      color: white;
      background: #333333;
    }
  }
`;

const Label = styled.label`
  color: #333333;
  display: inline-block;
  cursor: pointer;
  font-weight: 800;
  padding: 4px 15px;
  background: #dedede;
  transition: all 0.3s;

  &:hover {
    color: #636363;
  }

  & + input[type='radio'] + label {
    border-left: solid 2px #333333;
  }
`;

const RadioButtons = ({
  setSinglePlanJobDifficulty,
  checkedValueOne,
  setCheckedValueOne,
  checkedValueTwo,
  setCheckedValueTwo,
  checkedValueThree,
  setCheckedValueThree
}) => {
  //   const [checkedValueOne, setCheckedValueOne] = useState(true);
  //   const [checkedValueTwo, setCheckedValueTwo] = useState(false);
  //   const [checkedValueThree, setCheckedValueThree] = useState(false);

  const handleChange = () => {
    // if (checkedValueOne) {
    //   setCheckedValueTwo(false);
    //   setCheckedValueThree(false);
    // } else if (checkedValueTwo) {
    //   setCheckedValueOne(false);
    //   setCheckedValueThree(false);
    // } else if (checkedValueThree) {
    //   setCheckedValueOne(false);
    //   setCheckedValueTwo(false);
    // }
    setCheckedValueOne(true);
    setCheckedValueTwo(false);
    setCheckedValueThree(false);
  };

  return (
    <>
      <Form>
        <div className="radioGroup">
          <Input
            type="radio"
            id="option-one"
            name="selector"
            value="one"
            checked={checkedValueOne}
          />
          <Label
            htmlFor="option-one"
            onClick={() => {
              setSinglePlanJobDifficulty(1);
              setCheckedValueTwo(false);
              setCheckedValueThree(false);
              setCheckedValueOne(true);
            }}
          >
            LOW
          </Label>

          <Input
            type="radio"
            id="option-two"
            name="selector"
            value="two"
            checked={checkedValueTwo}
          />
          <Label
            htmlFor="option-two"
            onClick={() => {
              setSinglePlanJobDifficulty(2);
              setCheckedValueOne(false);
              setCheckedValueThree(false);
              setCheckedValueTwo(true);

              //   setCheckedValueTwo(true);
              //   handleChange();
            }}
          >
            MEDIUM
          </Label>

          <Input
            type="radio"
            id="option-three"
            name="selector"
            value="three"
            checked={checkedValueThree}
          />
          <Label
            htmlFor="option-three"
            onClick={() => {
              setSinglePlanJobDifficulty(3);

              setCheckedValueOne(false);
              setCheckedValueTwo(false);

              setCheckedValueThree(true);
              //   handleChange();
            }}
          >
            HIGH
          </Label>
        </div>
      </Form>
    </>
  );
};

export default RadioButtons;
