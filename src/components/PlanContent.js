import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import CheckInput from './CheckInput';

const Deadline = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  text-align: center;

  .deadlineTag {
    text-align: center;
    font-size: 20px;
    color: black;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 10px;

    span {
      font-weight: 600;
    }
  }
  .timeLeft {
    font-size: 15px;
    text-align: center;
    /* display: ; */
  }
`;

const TaskContainer = styled.div`
  margin: 20px auto 5px 5px;
  width: 75%;
`;

export default props => {
  const timeLeft = () => {
    let time = moment(props.deadline).diff(moment(), 'days');
    const prefix = time > 1 ? 'days' : 'day';
    return `${time} ${prefix}`;
  };
  // const dailyTaskProps = dailyTask;
  console.log('props.dailyTaskprops.dailyTask: ', props.dailyTask);

  return (
    <>
      <Deadline>
        <p className="deadlineTag">
          deadline:
          <span>
            {moment(props.deadline)
              .format('DD MMM YYYY')
              .toString()}
          </span>
        </p>
        <p className="timeLeft">
          Time left: <span>{timeLeft()}</span>
        </p>
      </Deadline>
      <TaskContainer>
        <CheckInput
          dailyTask={props.dailyTask.dailyTask}
          id={props.dailyTask.id}
          // key={dailyTask.id}
          planId={props.idPlan}
          isChecked={props.dailyTask.completed}
        ></CheckInput>
      </TaskContainer>
    </>
  );
};
