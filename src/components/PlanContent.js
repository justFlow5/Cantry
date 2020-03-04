import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { device } from './contexts/FunctionsProvider';

import CheckInput from './CheckInput';

const Deadline = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  text-align: center;

  .deadlineTag {
    @media ${device.mobileS} {
      text-align: center;
      font-size: 14px;
      color: black;
      /* letter-spacing: 0.5px; */
      text-transform: uppercase;
      margin-top: 10px;
    }

    @media ${device.mobileM} {
      font-size: 15px;
    }

    @media ${device.mobileL} {
      font-size: 16px;
    }

    @media ${device.tablet} {
      font-size: 18px;
    }

    @media ${device.laptop} {
      font-size: 19px;
    }

    @media ${device.laptopL} {
      font-size: 20px;
    }

    @media ${device.desktop} {
      font-size: 22px;
    }

    span {
      font-weight: 600;
    }
  }
  & .timeLeft {
    font-size: 13px;
    margin-top: 5px;

    @media ${device.mobileM} {
      font-size: 13px;
      text-align: center;
    }

    @media ${device.mobileL} {
      font-size: 14px;
    }

    @media ${device.tablet} {
      font-size: 15px;
    }

    @media ${device.laptop} {
      font-size: 16px;
    }

    @media ${device.laptopL} {
      font-size: 17px;
    }

    @media ${device.desktop} {
      font-size: 19px;
    }

    & span {
      font-weight: 600;
    }
  }
`;

const TaskContainer = styled.div`
  @media ${device.mobileM} {
    margin: 0px auto 5px 5px;
  }

  @media ${device.mobileL} {
    /* font-size: 14px; */
  }

  @media ${device.tablet} {
    /* font-size: 15px; */
  }

  @media ${device.laptop} {
    /* font-size: 16px; */
  }

  @media ${device.laptopL} {
    margin: 20px auto 5px 5px;
    width: 75%;
  }

  @media ${device.desktop} {
    font-size: 19px;
  }
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
          deadline:{' '}
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
