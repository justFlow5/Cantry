import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

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

  border: 0;
  border-bottom: 1px solid #c2c2c2;

  color: #c2c2c2;
  display: block;
  font-size: 18px;

  outline: 0;
  padding: 10px 12px 10px 12px;
  width: 100%;
  resize: none;
  cursor: text;
  transition: all 0.3s;

  &:focus {
    color: #1d2122;
    font-weight: 500;
    /* background: #fffff0; */
  }
`;

export default props => {
  const [isActive, setIsActive] = useState('');
  const [isFilled, setIsFilled] = useState('');

  //   const [setHeight, setHeightState] = useState('80px');

  const content = useRef(null);

  const autoGrow = el => {
    if (content !== null && content.current !== null) {
      console.log(el);
      el.current.style.height = '40px';
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

  return (
    <>
      {/* {<div> goal{JSON.stringify(goal)}</div>}
      {<div> specificators: {JSON.stringify(specificators)}</div>}
      {<div>singleSpec {JSON.stringify(singleSpec)}</div>}
      {<div> prices {JSON.stringify(prices)}</div>}
      {<div> singlePrice {JSON.stringify(singlePrice)}</div>}
      {<div>deadline {JSON.stringify(deadline)}</div>} */}
      <FormField
        className={`${isFilled} ${isActive}`}
        // style={{ maxHeight: `${setHeight}` }}
      >
        <Control className="form-field__control">
          {/* <Label htmlFor={props.id} className="form-field__label">
            {props.title}
          </Label> */}

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
              onBlur={() => setActive(false)}
              onFocus={() => setActive(true)}
              style={{
                overflow: 'hidden',
                // minHeight: '30px',
                // maxHeight: '120px',
                lineHeight: '1.3'
              }}
              spellcheck="false"
              //   oninput={autoGrow(content)}
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
              onBlur={() => setActive(false)}
              onFocus={() => setActive(true)}
              style={{
                fontSize: 'inherit',
                paddingBottom: '20px',
                height: 'inherit',
                lineHeight: '1.3'
              }}
              spellcheck="false"

              //   autoFocus
            ></Input>
          )}
        </Control>
      </FormField>
    </>
  );
};
