import React, { useContext } from 'react';
import styled from 'styled-components';
import PlanContext from '../Plan-context';

const Descriptor = styled.div`
  font-size: 20px;
  position: relative;
  max-width: 300px;
  height: 60%;
  -webkit-font-smoothing: antialiased;
  -webkit-filter: blur(0.000001px);
  transform: translateZ(0);
  transform: translate3d(0, 0, 0) !important;
  -webkit-transform: translate3d(0, 0, 0) !important;
  transform: perspective(1px) scale(1.1);
  /* min-width: 250px; */

  /* width: 300px; */
  margin: 20px;
  -webkit-transform: rotate(1deg);
  -moz-transform: rotate(1deg);
  -ms-transform: rotate(1deg);
  -o-transform: rotate(1deg);
  transform: rotate(1deg);

  & span {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 5px;

    color: #0d0d0d;
    cursor: pointer;
    z-index: 999;
    padding: 1px;
    font-weight: 700;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    -webkit-filter: blur(0.000001px);
    transform: translateZ(0);
    transform: translate3d(0, 0, 0) !important;
    -webkit-transform: translate3d(0, 0, 0) !important;
    transform: perspective(1px) scale(1.1);

    &:hover {
      color: #070707;
    }
  }

  &::before,
  &::after {
    content: ' ';
    position: absolute;
    z-index: 100;
  }

  &::before {
    background: rgba(0, 0, 0, 0.3);
    bottom: 2px;
    left: 4px;
    max-height: 60px;
    max-width: 180px;
    height: 70%;
    width: 90%;

    -webkit-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
    -ms-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
    -o-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.3);

    -webkit-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
    -moz-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
    -ms-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
    -o-transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
    transform: skew(-8deg, -2deg) rotate(-1deg) translate3d(0, 0, 0);
  }

  &::after {
    background: rgba(0, 0, 0, 0.1);
    height: 30%;
    max-height: 30px;
    max-width: 60px;
    right: 1px;
    top: 0px;
    width: 30%;

    -webkit-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
    -ms-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
    -o-box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);

    -webkit-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
    -moz-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
    -ms-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
    -o-transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
    transform: skew(-10deg, -5deg) rotate(-1deg) translate3d(0, 0, 0);
  }
`;
const Inner = styled.div`
  padding: 10px;
  min-height: 100px;
  background: #fff799;
  z-index: 900;
  position: relative;
  padding-top: 20px;
  /* padding-right: 30px; */
  font-size: 16px;
  word-wrap: break-word;
  -webkit-transform: rotate(-1deg);
  -moz-transform: rotate(-1deg);
  -ms-transform: rotate(-1deg);
  -o-transform: rotate(-1deg);
  transform: rotate(-1deg);
  -webkit-font-smoothing: antialiased;
  -webkit-filter: blur(0.000001px);
  transform: translateZ(0);
  transform: translate3d(0, 0, 0) !important;
  -webkit-transform: translate3d(0, 0, 0) !important;
  transform: perspective(1px) scale(1.1);
  color: black;
`;

export default ({ content, id, dataType }) => {
  // const [content, id] = props;
  const { deleteTempSpec, deleteTempPrice, deleteTempTask } = useContext(
    PlanContext
  );

  const deleteData = () => {
    switch (dataType) {
      case 'spec':
        deleteTempSpec(id);
      case 'price':
        deleteTempPrice(id);
      case 'task':
        deleteTempTask(id);
    }
  };

  return (
    <Descriptor>
      <span onClick={deleteData}>&#x2715;</span>
      <Inner>{content}</Inner>
    </Descriptor>
  );
};
