import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../contexts/FunctionsProvider';

const FormField = styled.div`
  display: block;
  margin-bottom: 16px;
  cursor: auto;

  &.form-field--is-active {
    & .form-field__control {
      &::after {
        border-bottom: 2px solid #1d2122;
        transform: scaleX(150);
      }
    }
    & .form-field__label {
      color: #1d2122;
      color: black;

      font-size: 0.8rem;
      top: 0px;

      transform: translateY(-14px);
    }
  }

  &.form-field--is-filled {
    & .form-field__label {
      /* font-size: 0.75rem; */
      font-size: 0.8rem;
      top: 0px;

      transform: translateY(-14px);
    }
  }
`;

const Label = styled.label`
  font-size: 1.3rem;

  font-weight: normal;
  left: 0;
  margin: 0;
  padding: 18px 12px;
  position: absolute;
  top: -5px;
  transition: all 0.4s;
  width: 100%;
  cursor: text;
`;

const Control = styled.div`
  @media ${device.mobileS} {
    background: #eee;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    position: relative;
    width: 50%;
    width: 100%;

    margin: 5px auto 0px;
  }

  @media ${device.mobileL} {
    width: 80%;
  }

  @media ${device.tablet} {
    width: 70%;
  }

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
    transition: all 0.4s;
    width: 1%;
  }
`;

const Input = styled.input`
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #999;
  color: #1d2122;
  color: black;
  display: block;
  font-size: 18px;
  margin-top: 24px;
  outline: 0;
  padding: 0 12px 10px 12px;
  width: 100%;
  resize: none;
  cursor: text;
`;

const InputQuote = props => {
  const [isActive, setIsActive] = useState('');
  const [isFilled, setIsFilled] = useState('');

  const [isClickedProps, setIsClickedProps] = useState(props.isAddClicked);

  //   const [setHeight, setHeightState] = useState('80px');

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
    if (content !== null && content.current !== null) {
      content.current.value === ''
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
  }, [isClickedProps]);

  return (
    <>
      <FormField
        className={`${isFilled} ${isActive}`}
        // style={{ maxHeight: `${setHeight}` }}
      >
        <Control className="form-field__control">
          <Label htmlFor={props.id} className="form-field__label">
            {props.title}
          </Label>

          {props.textarea ? (
            <Input
              as="textarea"
              //   autoFocus
              id={props.id}
              name={props.name}
              value={props.value}
              onChange={e => {
                e.preventDefault();
                props.action(e.target.value);

                autoGrow(content);
                // props.setInputLength(content.current.value);
              }}
              type="text"
              ref={content}
              onBlur={() => {
                setActive(false);
                setTimeout(() => {
                  autoGrow(content);
                }, 100);
              }}
              onFocus={() => setActive(true)}
              style={{
                overflow: 'hidden',
                // minHeight: '30px',
                // maxHeight: '120px',
                lineHeight: '1.3'
              }}
            ></Input>
          ) : (
            <Input
              id={props.id}
              name={props.name}
              value={props.value}
              onChange={e => {
                e.preventDefault();
                props.action(e.target.value);
                // props.setInputLength(content.current.value);
              }}
              type="text"
              ref={content}
              onBlur={() => {
                setActive(false);
                // autoGrow(content);
              }}
              onFocus={() => {
                setActive(true);
              }}

              //   autoFocus
            ></Input>
          )}
        </Control>
      </FormField>
    </>
  );
};

export default InputQuote;
