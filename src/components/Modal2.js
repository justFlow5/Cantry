import React, { useState, useEffect, useRef, useContext } from 'react';
import PlanContext from './contexts/Plan-context';

import Button from './Button';

import CreatePlan from './CreatePlan';

import styled from 'styled-components';

const Modal__Overlay = styled.div`
  @media (min-width: 40em) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* width: 100%;
    height: 100%; */
    z-index: 10;
    /* background-color: rgba(#000, 0.6);
    background-color: black; */
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    visibility: hidden;
    backface-visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1),
      visibility 0.6s cubic-bezier(0.55, 0, 0.1, 1);

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Modal = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  background-color: #f5f5f5;
  width: 1100px;
  /* max-width: 75rem; */
  min-height: 570px;
  /* max-height: 590px;  */
  padding: 1rem;
  border-radius: 3px;
  z-index: 11;
  opacity: 0;
  overflow-y: auto;
  visibility: hidden;
  box-shadow: 0 2px 10px rgba(#000, 0.1);
  backface-visibility: hidden;
  transform: scale(1.2);
  transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);

  &.active {
    visibility: visible;
    opacity: 1;
    transform: scale(1);

    & .modal-content {
      opacity: 1;
    }

    .close-modal {
      transform: translateY(10px);
      opacity: 1;
    }
  }

  @media (max-width: 39.9375em) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    border-radius: 0;
    transform: scale(1.1);
    padding: 0 !important;

    .close-modal {
      right: 20px !important;
    }
  }

  a {
    position: absolute;
    cursor: pointer;
    top: 5px;
    right: 15px;
    opacity: 0;
    backface-visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1),
      transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);
    transition-delay: 0.3s;

    .closeIcon {
      width: 30px;
      height: 30px;
      fill: #808080;
      background: transparent;
      padding: 3px;
      transition: all 0.4s;
      border-radius: 50%;
      &:hover {
        fill: #111111;

        background: #e2e2e2;
      }
    }
  }
`;

const Modal__Content = styled.div`
  position: relative;
  margin-top: 40px;
  opacity: 0;
  backface-visibility: hidden;
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  transition-delay: 0.3s;

  h3 {
    color: black;
  }
`;

export default props => {
  // const [isActive, setIsActive] = useState('');

  const { isActive, setIsActive } = useContext(PlanContext);

  const content = useRef(null);
  const overlay = useRef(null);

  const closeModalFromOutside = e => {
    // console.log(overlay);
    // console.log(`${e.target == overlay.current}`);
    // console.log(e.target);
    // console.log(overlay.current);
    if (e.target === overlay.current) setIsActive('');
  };

  // document.addEventListener('click', e => {
  //   if (isActive === 'active') {
  //     // console.log(e.target);
  //     setIsActive('');
  //   }
  // });

  const toggleModal = e => {
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    setIsActive(isActive === '' ? 'active' : '');
    // e.stopPropagation();

    // e.nativeEvent.stopImmediatePropagation();
  };

  typeof document !== 'undefined' &&
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27 && isActive === 'active') {
        setIsActive('');
      }
    });

  //   console.log()
  //   document.addEventListener('click', e => {
  //     if (e.target !== content && isActive === 'active') {
  //       setIsActive('');
  //     }
  //   });

  return (
    <>
      <Button
        action={toggleModal}
        content="Create new plan"
        mark="\002B"
        scale="1.6"
      >
        Open modal
      </Button>
      {/* onClick={toggleModal} */}
      {/* content="Create new plan" width="300px" mark="\002B" scale="1.6" */}
      {/* </button> */}
      {/* ></Button> */}

      <Modal__Overlay
        className={isActive}
        onClick={closeModalFromOutside}
        ref={overlay}
      >
        <Modal className={isActive} ref={content}>
          <a className="close-modal" onClick={toggleModal}>
            <svg className="closeIcon" viewBox="0 0 20 20">
              <path
                // fill="#000000"
                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
              ></path>
            </svg>
          </a>

          <Modal__Content className="modal-content">
            <CreatePlan />
          </Modal__Content>
        </Modal>
      </Modal__Overlay>
    </>
  );
};
