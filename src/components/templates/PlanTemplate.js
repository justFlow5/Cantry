import React from 'react';

import styled from 'styled-components';
import NavBar from '../Navbar';

import Button from '../Button';

import SpecificsIcon from '../icons/SpecificsIcon';
import PriceIcon from '../icons/PriceIcon';
import ProgressIcon from '../icons/ProgressIcon';
import moment from 'moment';

const PlanContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 70px auto;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  position: relative;
  /* background-color: #7d7d7d; */
  /* top: 350px; */
`;
const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0); */
  background-color: rgba(#000, 0.5);
  width: 100%;
  max-width: 800px;
  padding: 5px;
  border: 2px solid black;
  &:before,
  &:after {
    content: '•';
    position: absolute;
    width: 14px;
    height: 14px;
    font-size: 14px;
    color: black;
    border: 2px solid black;
    line-height: 12px;
    top: 5px;
    text-align: center;
  }
  &:before {
    left: 5px;
  }
  &:after {
    right: 5px;
  }

  .innerBox {
    position: relative;
    border: 2px solid black;
    padding: 53px;
    &:before,
    &:after {
      content: '•';
      position: absolute;
      width: 14px;
      height: 14px;
      font-size: 14px;
      color: black;
      border: 2px solid black;
      line-height: 12px;
      bottom: -2px;
      text-align: center;
    }
    &:before {
      left: -2px;
    }
    &:after {
      right: -2px;
    }
  }
`;
// const InnerBox = styled.div`
//   position: relative;
//   border: 2px solid black;
//   padding: 40px;
//   &:before,
//   &:after {
//     content: '•';
//     position: absolute;
//     width: 14px;
//     height: 14px;
//     font-size: 14px;
//     color: black;
//     border: 2px solid black;
//     line-height: 12px;
//     bottom: -2px;
//     text-align: center;
//   }
//   &:before {
//     left: -2px;
//   }
//   &:after {
//     right: -2px;
//   }
// `;

const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  /* border: 1px solid black; */
`;

const PlanTitle = styled.h3`
  color: black;
  font-size: 24px;
  /* margin-top: 50px; */

  .type {
  }
`;

const Deadline = styled.p`
  font-size: 17px;
  width: 100%;
  text-align: center;
  font-weight: 300;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  /* & > .container */
  & > .break {
    flex-basis: 100%;
    height: 0;
    margin: 0;
  }

  & .descriptorIcon {
    /* margin: 0 auto; */
  }
  & > div {
    padding: 10px;
    /* width: 49.9%; */
    margin: 30px auto 0;

    /* flex: 1 1 0; */

    h4 {
      font-size: 22px;
      padding: 10px;
      /* text-align: center; */
    }

    ul {
      padding: 5px 5px 0;
      list-style-type: none;
      /* text-align: left; */

      /* margin-left: 100px; */

      li {
        padding: 5px 15px;
        text-decoration: none;
      }
    }
  }
`;

const Details = styled.div`
  /* margin: 0 auto; */
`;

const Price = styled.div``;

const DailyRegimen = styled.div``;

const PlanStage = styled.div`
  margin-top: 30px;
  width: 80%;
`;

const Graph = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: grey;
  display: inline-block;
`;

const StatText = styled.p`
  display: inline-block;
  font-size: 20px;
  color: black;
  margin-bottom: 80px;
`;

const GoToPlan = styled.div`
  position: absolute;
  bottom: 5px;
  right: 40px;
`;

const PlanTemplate = ({ location }) => {
  console.log('location.state.plan', location.state);

  const { goal, specificators, prices, dailyTasks, deadline } = location.state;

  return (
    <>
      <NavBar />
      <PlanContainer>
        <Box>
          {/* <InnerBox> */}
          <div className="innerBox">
            <PlanContent>
              <PlanTitle>{goal}</PlanTitle>
              <Deadline>
                <span>Deadline:</span>{' '}
                {moment(deadline)
                  .format('DD MMM YYYY')
                  .toString()}
              </Deadline>
              <DescriptionContainer>
                <Details className="descriptor">
                  <h4>
                    {' '}
                    <span>
                      <SpecificsIcon width="25px" className="descriptorIcon" />{' '}
                    </span>
                    Make it specific:
                  </h4>{' '}
                  <ul>
                    {/* {console.log(specificators)} */}
                    {specificators.map(({ singleSpec, id }) => {
                      return <li key={id}>{singleSpec}</li>;
                    })}
                  </ul>
                </Details>
                <Price className="descriptor">
                  <h4>
                    {' '}
                    <span>
                      <PriceIcon width="25px" className="descriptorIcon" />{' '}
                    </span>
                    Price to pay:
                  </h4>
                  <ul>
                    {prices.map(({ singlePrice, id }) => {
                      return <li key={id}>{singlePrice}</li>;
                    })}
                  </ul>
                </Price>
                <div className="break"></div>
                <DailyRegimen>
                  {' '}
                  <h4>
                    <span>
                      <ProgressIcon width="30px" className="descriptorIcon" />{' '}
                    </span>
                    Daily regimen
                  </h4>
                  <ul>
                    {dailyTasks.map(({ dailyTask, id }) => {
                      return <li key={id}>{dailyTask}</li>;
                    })}
                  </ul>
                </DailyRegimen>
              </DescriptionContainer>

              <PlanStage>
                <Graph />
                <StatText>You are on 20 day stroke.</StatText>
                <GoToPlan>
                  <Button
                    mark={'\\270E'}
                    content={'Tasks'}
                    width="175px"
                    scale="1.3"
                  ></Button>
                </GoToPlan>
              </PlanStage>
            </PlanContent>
            {/* </InnerBox> */}
          </div>
        </Box>
      </PlanContainer>
    </>
  );
};

export default PlanTemplate;
