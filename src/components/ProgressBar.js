import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';

const Procent = styled.h3`
  font-size: 28px;
  /* margin-top: -50px; */
  font-weight: 600;
`;

const Deadline = styled.p`
  font-size: 16px;
  margin-top: 5px;
  font-weight: 500;
`;

const ProgressBar = ({ progress, deadline }) => {
  const timeLeft = () => {
    let time = moment(deadline).diff(moment(), 'days');
    const prefix = time > 1 ? 'days' : 'day';
    return `${time} ${prefix}`;
  };
  // const text =

  return (
    <CircularProgressbarWithChildren
      value={progress}
      // text={`${percentage}%`}
      circleRatio={0.75}
      //   styles={buildStyles({
      //     rotation: 1 / 2 + 1 / 8,
      //     strokeLinecap: 'butt',
      //     trailColor: '#eee'
      //   })}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 1 / 2 + 1 / 8,

        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'butt',

        // Text size
        textSize: '16px',

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',

        // Colors
        // 106, 245, 88
        // rgba(123, 240, 108, 1)

        // pathColor: `rgba(106, 245, 88, 1)`,
        // pathColor: '#45fd4d',
        pathColor: '#13f91d',

        textColor: '#3c3232',
        trailColor: '#D0D0D0',
        backgroundColor: '#b5b5b5'
      })}
    >
      <Procent>{progress}%</Procent>
      <Deadline>{timeLeft()} left</Deadline>
    </CircularProgressbarWithChildren>
  );
};

export default ProgressBar;
