import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

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
    z-index: 999;
    /* background-color: rgba(#000, 0.6);
    background-color: black; */
    background-color: rgba(0, 0, 0, 0.9);
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
  position: relative;
  margin: 0 auto;
  background-color: #f5f5f5;
  width: 500px;
  height: 215px;
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
  margin-top: 20px;
  opacity: 0;
  backface-visibility: hidden;
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  transition-delay: 0.3s;

  h3 {
    color: black;
  }
`;

const Popup = styled.div`
  & .header {
    font-size: 23px;
    color: #1d2122;
    padding: 5px 10px;
    text-align: center;
    position: relative;

    & > .goal {
      /* display: block; */
      font-weight: 600;
      font-size: 20px;
      &:before {
        content: '\\201E';
      }
      &:after {
        content: '\\201D';
      }
    }
    & .subtext {
      font-size: 15px;
    }
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Popup__button = styled.button`
  width: 120px;
  height: 50px;
  /* color: #e2e2e2; */
  color: #eaeff0;
  border: 1px solid #1d2122;
  border-radius: 4px;
  background-color: #1d2122;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: 0.6px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s;
  /* margin: auto auto 40px; */

  &:hover {
    color: #b1b1b1;
    border: 1px solid black;
  }
`;

const Confirmation = styled.div`
  & .confirmation {
    font-size: 27px;
    color: #1d2122;
    padding: 5px 10px;
    text-align: center;
    position: relative;
    font-weight: 600;
  }
`;

const ConfButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default props => {
  //   console.log('FROM MODAL, props.active: ', props.active);

  //   const [isActive, setIsActive] = useState('');
  //   console.log('FROM MODAL, state, active? : ', isActive);
  let history = useHistory();
  //   const { isActive, setIsActive } = useContext(PlanContext);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const content = useRef(null);
  const overlay = useRef(null);

  const closeModalFromOutside = e => {
    if (e.target === overlay.current) props.setShowModal('');
  };

  const toggleModal = e => {
    // if (props.active === 'active') setIsActive('active');

    // setIsActive(props.active === 'active' ? 'active' : '');

    props.setShowModal(props.isActive === '' ? 'active' : '');
  };

  typeof document !== 'undefined' &&
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27 && props.isActive === 'active') {
        props.setShowModal('');
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
      <Modal__Overlay
        className={props.isActive}
        onClick={closeModalFromOutside}
        ref={overlay}
      >
        <Modal className={props.isActive} ref={content}>
          <a className="close-modal" onClick={toggleModal}>
            <svg className="closeIcon" viewBox="0 0 20 20">
              <path
                // fill="#000000"
                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
              ></path>
            </svg>
          </a>

          <Modal__Content className="modal-content">
            {!isConfirmed ? (
              <Popup>
                <p className="header">
                  Delete the plan: <br />
                  <span className="goal">{props.goal}</span> ?
                  {/* </blockquote> */}
                  {/* <span className="subtext">This operation is permanent.</span> */}
                </p>
                <ButtonsContainer>
                  <Popup__button
                    onClick={() => {
                      props.removePlan(props.id);
                      setIsConfirmed(true);
                    }}
                  >
                    yes
                  </Popup__button>

                  <Popup__button
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    cancel
                  </Popup__button>
                </ButtonsContainer>
              </Popup>
            ) : (
              <Confirmation>
                <p className="confirmation">
                  {' '}
                  The plan has been successfully deleted.
                </p>
                <ConfButtonContainer>
                  {/* <Link to="/dashboard"> */}
                  <Popup__button
                    onClick={() => {
                      history.push('/dashboard');
                      toggleModal();
                    }}
                  >
                    OK
                  </Popup__button>
                  {/* </Link> */}
                </ConfButtonContainer>
              </Confirmation>
            )}
          </Modal__Content>
        </Modal>
      </Modal__Overlay>
    </>
  );
};
