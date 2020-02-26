import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

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

const RadioButtonsEdit = ({
  //   setSinglePlanJobDifficulty,

  difficulty,
  id,
  editPlanJobs
}) => {
  console.log('difficulty: ', difficulty);

  const [isClicked, setIsClicked] = useState('');

  const newId1 = uuid();
  const newId2 = uuid();
  const newId3 = uuid();

  return (
    <>
      <Form>
        <div className="radioGroup">
          <Input
            type="radio"
            id={newId1}
            name="selector"
            value="one"
            checked={difficulty === 1 || isClicked === 1}
            // ref={input1}
          />
          <Label
            htmlFor={newId1}
            onClick={() => {
              //   input1.current.checked = true;
              setIsClicked(1);
              editPlanJobs(id, { type: 'difficulty', content: 1 });
              //   setSinglePlanJobDifficulty(1);
              //   setCheckedValueTwo(false);
              //   setCheckedValueThree(false);
              //   setCheckedValueOne(true);
              //   setIsClicked(`${id}`);
            }}
          >
            LOW
          </Label>

          <Input
            type="radio"
            id={newId2}
            name="selector"
            value="two"
            checked={difficulty === 2 || isClicked === 2}
            // ref={input2}
          />
          <Label
            htmlFor={newId2}
            onClick={() => {
              //   input2.current.checked = true;
              setIsClicked(2);
              editPlanJobs(id, { type: 'difficulty', content: 2 });

              //   setIsClicked(`${id}`);
              //   setSinglePlanJobDifficulty(2);
              //   setCheckedValueOne(false);
              //   setCheckedValueThree(false);
              //   setCheckedValueTwo(true);
              //   setCheckedValueTwo(true);
              //   handleChange();
            }}
          >
            MEDIUM
          </Label>

          <Input
            type="radio"
            id={newId3}
            name="selector"
            value="three"
            checked={difficulty === 3 || isClicked === 3}
            // ref={input3}
          />
          <Label
            htmlFor={newId3}
            onClick={() => {
              //   input3.current.checked = true;
              setIsClicked(3);
              editPlanJobs(id, { type: 'difficulty', content: 3 });

              //   setSinglePlanJobDifficulty(3);
              //   setIsClicked(`${id}`);
              //   setCheckedValueOne(false);
              //   setCheckedValueTwo(false);
              //   setCheckedValueThree(true);
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

export default RadioButtonsEdit;
