import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = props => {
  const percentage = props.progress;

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
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

        pathColor: `rgba(106, 245, 88, 1)`,
        textColor: '#3c3232',
        trailColor: '#d6d6d6',
        backgroundColor: '#3c3232'
      })}
    />
  );
};

export default ProgressBar;
