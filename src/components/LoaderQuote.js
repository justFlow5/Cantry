import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
`;

const SpinnerBox = styled.div`
  /* width: ${props => (props.size ? props.size : '100px')}; */
  /* height: ${props => (props.size ? props.size : '100px')}; */
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(244, 244, 244, 0.7);
  margin: 0 auto;
`;

const PulseContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PulseBubble = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;

  background-color: #070707;
  &.pulse-bubble-1 {
    animation: ${pulse} 0.4s ease 0s infinite alternate;
  }
  &.pulse-bubble-2 {
    animation: ${pulse} 0.4s ease 0.2s infinite alternate;
  }
  &.pulse-bubble-3 {
    animation: ${pulse} 0.4s ease 0.4s infinite alternate;
  }
`;

const LoaderQuote = props => {
  return (
    <SpinnerBox>
      <PulseContainer>
        <PulseBubble className="pulse-bubble-1" />
        <PulseBubble className="pulse-bubble-2" />
        <PulseBubble className="pulse-bubble-3" />
      </PulseContainer>
    </SpinnerBox>
    // )
  );
};

export default LoaderQuote;
