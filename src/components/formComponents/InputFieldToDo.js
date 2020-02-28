import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const FormField = styled.div`
  display: block;
  margin-bottom: 16px;
  cursor: auto;

  &.form-field--is-active {
    & .form-field__control {
      &::after {
        border-bottom: 2px solid black;
        transform: scaleX(150);
      }
    }
    & .form-field__label {
      color: black;
      font-size: 0.8rem;
      top: 0px;
      transform: translateY(-14px);
    }
  }

  &.form-field--is-filled {
    & .form-field__label {
      /* font-size: 0.75rem; */
      font-size: 0.6rem;

      transform: translateY(-14px);
    }
  }
`;

const Control = styled.div`
  /* background: rgba(244, 244, 244, 0.8); */
  background: rgba(#000, 0.5);
  border-radius: 8px 8px 8px 8px;
  overflow: hidden;
  position: relative;

  width: 100%;
  /* box-shadow: 0 0 10px; */
  /* box-shadow: 0 10px 6px -6px #777; */

  /* margin: 30px auto 0px; */

  &::after {
    border-bottom: 2px solid black;
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    transform: scaleX(0);
    transition: all 0.5s;
    width: 1%;
  }
`;

const Input = styled.input`
  appearance: none;
  background-color: rgba(247, 247, 247, 1);
  overflow: hidden;
  border: 0;
  border-bottom: 1px solid #c2c2c2;

  color: #5e5e5e;
  display: block;
  font-size: 18px;

  outline: 0;
  padding: 10px 12px 10px 12px;
  width: 100%;
  resize: none;
  cursor: text;
  /* transition: all 0.3s; */

  &:focus {
    color: #1d2122;
    font-weight: 500;
    /* background: #fffff0; */
  }
`;

const InputFieldToDo = props => {
  const [isActive, setIsActive] = useState('');
  const [isFilled, setIsFilled] = useState('');

  // const [height, setHeight] = useState(`${inputContent.scrollHeight}`);

  //   const [setHeight, setHeightState] = useState('80px');

  const inputContent = useRef(null);
  const content = useRef(null);

  const autoGrow = el => {
    if (content !== null && content.current !== null) {
      // console.log(el);
      el.current.style.height = '35px';
      el.current.style.height = `${el.current.scrollHeight}px`;
    }
  };

  const setActive = active => {
    if (active) {
      setIsActive('form-field--is-active');
    } else {
      setIsActive('');
    }
    if (inputContent !== null && inputContent.current !== null) {
      inputContent.current.value === ''
        ? setIsFilled('')
        : setIsFilled('form-field--is-filled');
    }
  };

  useEffect(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    autoGrow(content);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      autoGrow(content);
    }, 100);
    props.setIsAddClicked(false);
  }, [props.isAddClicked]);

  return (
    <>
      <FormField className={`${isFilled} ${isActive}`}>
        <Control className="form-field__control">
          {props.textarea ? (
            <Input
              as="textarea"
              id={props.id}
              value={props.value}
              onChange={e => {
                e.preventDefault();
                props.action(e.target.value);
                autoGrow(content);

                // onInputChange(e);
              }}
              type="text"
              ref={content}
              onBlur={() => {
                setActive(false);
                autoGrow(content);
              }}
              onFocus={() => setActive(true)}
              style={{
                overflow: 'hidden',
                lineHeight: '1.4'
              }}
              spellCheck="false"
            ></Input>
          ) : (
            <Input
              id={props.id}
              name={props.name}
              value={props.value}
              onChange={e => {
                props.setGoalEdit(e.target.value);

                if (props.isEditClicked) props.setIsEditClicked(false);
              }}
              type="text"
              ref={content}
              onBlur={() => setActive(false)}
              onFocus={() => setActive(true)}
              style={{
                fontSize: 'inherit',
                paddingBottom: '10px',
                height: 'inherit',
                lineHeight: '1.3',
                textAlign: 'center'
              }}
              spellCheck="false"

              //   autoFocus
            ></Input>
          )}
        </Control>
      </FormField>
    </>
  );
};

export default InputFieldToDo;
