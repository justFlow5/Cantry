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
  & input {
    @media ${device.mobileM} {
      font-size: 34px;
    }
    @media ${device.mobileL} {
      font-size: 35px;
    }

    @media ${device.tablet} {
      font-size: 36px;
    }

    @media ${device.laptop} {
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
    }
  }
`;

const Input = styled.input`
  @media ${device.mobileS} {
    appearance: none;
    background-color: rgba(247, 247, 247, 1);
    overflow: hidden;
    border: 0;
    border-bottom: 1px solid #c2c2c2;

    color: #c2c2c2;
    display: block;
    /* font-size: 18px; */

    outline: 0;
    padding: 10px 12px 10px 12px;
    width: 100%;
    resize: none;
    cursor: text;
  }
  @media ${device.tablet} {
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }
  /* transition: all 0.3s; */

  &:focus {
    color: #1d2122;
    font-weight: 500;
    /* background: #fffff0; */
  }
`;

const InputFieldEdit = props => {
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

  const onInputChange = e => {
    // e.preventDefault();
    const field = e.target.value;
    const id = e.target.id;

    props.action(id, field);

    autoGrow(inputContent);

    if (props.isEditClicked) props.setIsEditClicked(false);

    // console.log('e.target', e.target);
  };

  return (
    <>
      <FormField className={`${isFilled} ${isActive}`}>
        <Control className="form-field__control">
          {props.textarea ? (
            <Input
              as="textarea"
              id={props.id}
              name={props.name}
              value={props.value}
              onChange={e => {
                e.preventDefault();
                props.action(props.id, e.target.value);
                autoGrow(content);
                if (props.isEditClicked) props.setIsEditClicked(false);

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
                // fontSize: 'inherit',
                // paddingBottom: '25px',
                // height: 'inherit',
                // lineHeight: '1',
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

export default InputFieldEdit;
