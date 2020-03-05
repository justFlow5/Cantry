import React, { useState, useEffect, useRef, useContext } from 'react';
import { FuncContext, device } from '../contexts/FunctionsProvider';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import 'react-dates/initialize';
// import '../formComponents/_datepicker_custom.css';
import './_template_datePicker.css';

import { SingleDatePicker } from 'react-dates';

import styled from 'styled-components';
import NavBar from '../Navbar';

import Button from '../Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import SpecificsIcon from '../icons/SpecificsIcon';
import PriceIcon from '../icons/PriceIcon';
import ProgressIcon from '../icons/ProgressIcon';
import DiagramIcon from '../icons/Diagram';
import CheckInput from '../CheckInputEdit';
import Strong from '../icons/Strong';

import moment from 'moment';

const PlanContainer = styled.div`
  @media ${device.mobileS} {
    width: 100%;
    display: flex;
    width: 100%;
    margin: 70px auto 30px;
    align-items: center;
    justify-content: center;
    /* border: 1px solid black; */
    position: relative;
    overflow: hidden;
  }
  @media ${device.tablet} {
    width: 80%;
  }
`;
const Box = styled.div`
  /* @media ${device.mobileS} {
    width: 70%;
    border-radius: 8px;
  } */

  @media ${device.tablet} {
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
      /* padding: 53px; */
      padding: 7px;

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
  }
`;

const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  /* border: 1px solid black; */
`;

// const PlanTitleContainer = styled.div`
//   &:hover {
//     cursor: pointer;
//     & .activeTitle {
//       /* &:before,
//       &:after {
//         width: 100%;
//         opacity: 1; */
//       &:before,
//       &:after {
//         width: 50%;
//       }
//     }
//   }
// `;
const PlanTitle = styled.h4`
  @media ${device.mobileS} {
    color: black;
    font-size: 36px;
    font-weight: 500;
    position: relative;
    outline: 0;
    padding: 10px 30px;
    transition: all 0.3s;
    text-align: center;
  }

  @media ${device.mobileL} {
    font-size: 39px;
  }

  @media ${device.tablet} {
    font-size: 42px;
    height: 50px;
  }

  @media ${device.laptop} {
    font-size: 42px;
  }

  @media ${device.laptopL} {
    font-size: 42px;
    height: 60px;
  }

  @media ${device.desktop} {
  }

  &.activeTitle {
    background: #d6d7d8;
    border: 1px solid #858689;
    box-shadow: 0 0 10px;
  }
  & span {
    display: inline-block;

    position: absolute;
    top: -18%;
    right: 1%;
  }
  /* margin-top: 50px; */

  /* &.activeTitle:before,
  &.activeTitle:after {
    content: '';
    position: absolute;
    bottom: -10px;
    width: 0px;
    height: 5px;
    margin: 5px 0 0;
    transition: all 0.2s ease-in-out;
    transition-duration: 0.4s;
    opacity: 0;
    background-color: black;

    &.activeTitle:before {
      left: 50%;
    }
    &.activeTitle:after {
      right: 50%;
    }
    &:hover {
      cursor: pointer;
      &:before,
      &:after {
        width: 100%;
        opacity: 1;
      }
    } */
  /* } */
`;
const EditButton = styled.button`

@media ${device.mobileS} {
  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  border: 1.5px solid #1F1C23;
  outline: none;
  color: #1F1C23;
margin-bottom: 20px;
  white-space: nowrap;

  letter-spacing: 2px;
  background: 0 0;
  text-transform: uppercase;
  /* float: right; */
  text-align: center;
  font-weight: 500;

  border-radius: 4px;
  font-size: 18px;
  /* padding: 5px; */
  /* width: 300px; */
  width: 200px;
  transition: all 0.3s;

  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
}
  @media ${device.tablet} {
  position: absolute;
    top: -50px;
    right: 45px;
  }

/* @media ${device.tablet} {
margin-top: inherit;

} */

  
  span {
    /* cursor: pointer; */
    display: inline-block;
    position: relative;
    transition: 0.3s;
  }
  
  span:after {
    /* content:"${props => (props.plus ? '\\002B' : '\\00bb')}"; */
    /* content:"${props => (props.plus ? '\\002B' : props.mark)}"; */
    content: '\\270E';
    color:  #0e1111;
    font-weight: 600;

    position: absolute;
    opacity: 0;
    top: -4px;
    transform: scale(1.3);
    right: -30px;
    transition: 0.3s;
  }
  
  :hover span {
    padding-right: 33px;
  

  }

  :hover span:after {
    opacity: 1;
    right: 0;
  }
`;
const Deadline = styled.p`
  /* padding-top: 15px; */
  text-align: center;
  /* font-weight: 300; */
  /* margin: 30px 0 15px; */
  /* display: inline-block; */

  transition: all 0.3s;

  @media ${device.tablet} {
    font-size: 19px;
    /* margin: 30px 0 15px; */
    padding-top: 25px;
  }
  & > span {
    @media ${device.mobileS} {
      font-weight: 700;
      position: relative;
      /* bottom: 8px; */
      font-size: 19px;
      line-height: 1.2;
    }

    @media ${device.mobileL} {
    }

    @media ${device.tablet} {
      font-size: 19px;
      margin: 30px 0 15px;
      padding-top: 15px;
    }

    @media ${device.laptop} {
      font-size: 19px;
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
    }

    /* margin-right: 5px; */
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  /* & > .container */
  & > .break {
    flex-basis: 100%;
    height: 0;
    margin: 0;
  }

  & .descriptorIcon {

    @media ${device.mobileS} {
      width: 35px;
  height: 35px;
  position: relative;
  bottom: -25px;

  &.diagram {
    bottom: -17px;
  } 

}

@media ${device.tablet} {
  

  left: 10px;
  padding-right: 3px;

  &.glass {
    bottom: -30px;
  }

  &.round {
    bottom: -33px;
  }
  &.quirk {
    bottom: -10px;
  }
  &.flash {
    bottom: -20px;
  }

  &.diagram {
    bottom: -10px;
  } 
}

    /* padding: 0 20px; */
  }

  & > .descriptor {
    @media ${device.mobileS} {
     
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      border-bottom: 1px solid #8e8e8e;
      position: relative;

      &:first-child {
        padding-top: 25px;
      }
    }

    @media ${device.tablet} {
      width: 100%;
      padding: 20px 0;
      padding: 40px;
      flex-direction: row;
      align-items: unset;

      &:first-child {
        padding-top: 25px;
      }
    }

    & .spanIcon {
      /* @media ${device.mobileS} {
        padding-left: 120px;
      }
      @media ${device.mobileM} {
        padding-left: 100px;
      }

      @media ${device.mobileL} {
        padding-left: 30px;
      }

      */
      @media ${device.tablet} {
        padding-left: unset;
      }
      @media ${device.laptop} {
      } 
    }
    /* & svg {
      width: 25px;
      height: 25px;
      position: relative;
      text-align: center;
    } */

    /* & > * {} */
    /* padding: 0px 40px 40px; */

    /* flex: 1 1 0; */

    &:last-child {
      border-bottom: unset;
    }

    h4 {

      @media ${device.mobileS} {
        font-size: 21px;
      display: inline-block;
      text-align:center;
      width: 90%;
      padding: 30px 0 0;
      }

      @media ${device.mobileL} {
        font-size: 24px;

      }

      @media ${device.tablet} {
        font-size: 19px;
        width: 20%;
      text-align: center;
      padding: 10px;
      font-size: 22px;
      white-space: pre-wrap;
      margin-right: 10px;
 
      & .break {
        @media ${device.tablet} {
          display: block;
        }
      }
      }



    }

    ul {
      @media ${device.mobileS} {
        list-style-type: none;
        width: 85%;
        padding-right: 5px;

        &:last-child {
          /* width: 100%; */
        }
      }

      @media ${device.mobileM} {
        width: 80%;
      }

      @media ${device.mobileL} {
        width: 80%;
      }

      @media (min-width: 650px) {
        width: 70%;
      }
      @media ${device.tablet} {
        list-style-type: none;
        padding-right: 5px;
        width: 80%;
      }

      /* @media ${device.mobileM} {
        padding-right: 90px;
      }

      @media ${device.mobileL} {
        padding-right: 30px;
      }

      @media ${device.tablet} {
        padding: 5px 5px 0;
      }

      @media ${device.laptop} {
      }

      @media ${device.laptopL} {
      }

      @media ${device.desktop} {
      } */

      li {
       
        padding: 0px 15px;
        text-decoration: none;
        margin-top: 25px;
        transition: all 0.3s;
        border: none;
        outline: none;
        box-shadow: none;
        padding: 10px;
        padding-right: 20px;
        position: relative;
        word-wrap: break-word;

        &:last-child {

        @media ${device.mobileS} {
          margin-bottom: 20px;
          }
          @media ${device.tablet} {
            margin-bottom: inherit;
}
        }

        &.task {
          margin-top: 0;
        }

        &:first-child {
          margin-top: 10px;

          &.task {
            margin-top: 0;
          }
        }

        &.verticalBorder {
          /* border-left: 4px solid #716d6e; */
          /* border-left: 4px solid #34353a; */
          border-left: 4px solid #34353a;

          /* &.editActive {
            background: #d6d7d8;
            border: 1px solid #858689;
            box-shadow: 0 0 10px;
            padding: 10px;
          } */
        }
        & .spanIcon {
          /* display: inline-block;
          position: absolute;
          top: 3%;
          right: 1%;
          width: 20px;
          height: 20px; */
/* 
          @media ${device.mobileS} {
            padding-left: 85px;
          }
          @media ${device.mobileM} {
            padding-left: 75px;
          }

          @media ${device.mobileL} {
            padding-left: 65px;
          }
*/
          @media ${device.tablet} {
            padding-right: 15px;
          } 

          & svg {
            position: absolute;

            z-index: 2;

            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;

const Details = styled.div`
  /* margin: 0 auto; */
`;

const Price = styled.div``;

const DailyRegimen = styled.div``;

const Statistics = styled.div`
  &.descriptor {
    /* margin-top: 40px; */
    margin-bottom: 40px;
  }

  & h4 {
    position: relative;
    top: -10px;
  }

  & ul {
    position: relative;
  }

  & .series {
    @media ${device.mobileS} {
      margin: 40px auto 10px;
      text-align: center;
      font-size: 17px;
      display: inline-block;
      border-bottom: 1px solid rgba(105, 105, 105, 0.45);
      padding-bottom: 4px;
    }

    @media ${device.mobileL} {
      margin: 80px auto 0;
    }

    @media ${device.tablet} {
      font-size: 18px;
      text-align: center;
      margin: 100px auto 0;
    }

    & .seriesResult {
      font-weight: 600;
    }
  }
`;
const LineChartContainer = styled.div`
  @media ${device.mobileS} {
    word-break: keep-all;
    position: relative;
    margin-right: 50px;
    width: 310px;
    height: 200px;
  }

  @media ${device.mobileL} {
    width: 370px;
  }

  @media (min-width: 625px) {
    width: 380px;
  }

  @media ${device.tablet} {
    margin: 100px 0;
    padding-right: 60px;
    width: 450px;
    height: 100px;
  }

  /* margin-right: 40%; */
  /* margin-right: 250px; */
  /* margin-right: 200px; */

  & .recharts-legend-item-text {
    word-break: unset;
    /* width: 50px; */
  }
`;

const StatData = styled.div`
  @media ${device.mobileS} {
    position: relative;
    /* top: 0;
    right: 0; */
    padding: 5px 10px;
    /* border: 1px solid black; */
    border-radius: 4px;
    font-size: 14px;
    padding-left: 40px;
    text-align: left;

    & p {
      margin-bottom: 3px;
    }
  }

  @media ${device.mobileL} {
    margin-top: 20px;
    font-size: 15px;
  }

  @media ${device.tablet} {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 15px;
    font-size: 14px;
    border: 1px solid black;
  }
  /* margin-bottom: 20px; */

  & .singleDataResult {
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  @media ${device.mobileS} {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    position: relative;
    width: 100%;
  }

  @media ${device.mobileL} {
    margin-top: 0;
  }

  @media ${device.tablet} {
    justify-content: flex-end;
    margin-top: 25px;
    margin-bottom: 25px;
  }
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

const PlanTemplate = ({ location }) => {
  const { plan } = location.state;

  const { checkData, plans } = useContext(FuncContext);

  const thePlan = plans.find(singlePlan => {
    return singlePlan.id === plan.id;
  });

  const dataPlan = thePlan.dailyTask.history;

  let trueCounter = 0;
  let falseCounter = 0;

  // const newData = [
  //   { '02-03-2020': true },
  //   { '03-03-2020': true },
  //   { '04-03-2020': true },
  //   { '04-03-2020': false },
  //   { '05-03-2020': true },
  //   { '06-03-2020': true },
  //   { '07-03-2020': true },
  //   { '08-03-2020': true },
  //   { '09-03-2020': true },
  //   { '10-03-2020': false }
  // { '11-03-2020': true },
  // { '12-03-2020': true },
  // { '13-03-2020': true },
  // { '14-03-2020': true },
  // { '15-03-2020': true },
  // { '16-03-2020': true },
  // { '17-03-2020': true },
  // { '18-03-2020': true },
  // { '19-03-2020': true },
  // { '20-03-2020': false },
  // { '21-03-2020': true }
  // ];

  let firstDate = dataPlan[2];
  console.log('firstDate', firstDate);
  let startDate = moment(Object.keys(firstDate)[0].valueOf());
  console.log('startDate', startDate.format('DD-MMM-YYYY'));

  let endDate = moment(thePlan.deadline);
  console.log('endDate', endDate);
  let occurencess = [];
  let counter = 0;

  const timeLeft = moment(endDate).diff(moment(startDate), 'days');
  // console.log('end Date ', moment(endDate).format('DD-MM-YYYY'));
  console.log('startDate ', moment(startDate));
  console.log('TIME LEEEEFT: ', timeLeft);

  const modifiedData = dataPlan.map(date => {
    // const modifiedData = newData.map(date => {
    let propertyName = Object.keys(date)[0];
    if (date[propertyName] === true) {
      trueCounter++;
      counter++;

      // let name = date[Object.keys(date)[0]]
      return { name: propertyName, 'daily task': trueCounter };
    } else {
      let occurance = counter;
      console.log('occurencess: ', occurencess);
      occurencess.push(occurance);
      counter = 0;
      return { name: propertyName, 'daily task': trueCounter };
    }
    // if there is no false value at the end of array
  });
  occurencess.push(counter);
  let maxValue = Math.max(...occurencess);
  // console.log('modifiedData', modifiedData);

  useEffect(() => {
    checkData(thePlan.id);
  }, [thePlan]);

  const formatGoal = str => str.replace(/\W+/g, '-').toLowerCase();

  return (
    <>
      <NavBar />
      <PlanContainer>
        <Box>
          <div className="innerBox">
            <PlanContent>
              <PlanTitle>{thePlan.goal}</PlanTitle>
              <Deadline>
                <span>Deadline:</span>{' '}
                {moment(thePlan.deadline)
                  .format('DD MMM YYYY')
                  .toString()}
              </Deadline>

              <DescriptionContainer>
                <Details className="descriptor">
                  <span className="spanIcon">
                    <SpecificsIcon
                      width="25px"
                      className="descriptorIcon glass"
                    />{' '}
                  </span>
                  <h4>
                    <span className="break">Make </span>
                    <span className="break">It </span>
                    <span className="break">Specific</span>
                  </h4>{' '}
                  <ul>
                    {thePlan.specificators.map(({ singleSpec, id }) => {
                      return (
                        <li key={id} id={id} className="verticalBorder">
                          {singleSpec}
                        </li>
                      );
                    })}
                  </ul>
                </Details>
                <Price className="descriptor">
                  <span className="spanIcon">
                    <PriceIcon width="25px" className="descriptorIcon round" />{' '}
                  </span>
                  <h4>
                    <span className="break">Price </span>
                    <span className="break">To </span>
                    <span className="break">Pay</span>
                  </h4>
                  <ul>
                    {thePlan.prices.map(({ singlePrice, id }) => {
                      return (
                        <li key={id} id={id} className="verticalBorder">
                          {singlePrice}
                        </li>
                      );
                    })}
                  </ul>
                </Price>
                <div className="break"></div>
                <DailyRegimen className="descriptor">
                  {' '}
                  <span className="spanIcon">
                    <Strong width="25px" className="descriptorIcon flash" />{' '}
                  </span>
                  <h4>
                    <span className="break">Daily </span>
                    <span className="break">regimen</span>
                  </h4>
                  <ul>
                    <li key={thePlan.dailyTask.id} className="task">
                      <CheckInput
                        dailyTask={plan.dailyTask.dailyTask}
                        id={thePlan.dailyTask.id}
                        key={thePlan.dailyTask.id}
                        // editTask={editTask}
                        planId={thePlan.id}
                        isChecked={thePlan.dailyTask.completed}
                      ></CheckInput>
                    </li>
                  </ul>
                </DailyRegimen>
                <Statistics className="descriptor">
                  {' '}
                  <span className="spanIcon">
                    <DiagramIcon className="descriptorIcon diagram" />{' '}
                  </span>
                  <h4>
                    <span className="break">Stats </span>
                    <span className="break">Data</span>
                  </h4>
                  <div style={{ textAlign: 'center' }}>
                    {/* <StatData>
                      <p className="singleData">
                        Started at:{' '}
                        <span className="singleDataResult">
                          {startDate.format('DD MMM YYYY')}
                        </span>{' '}
                      </p>
                      <p className="singleData">
                        Planned deadline:{' '}
                        <span className="singleDataResult">
                          {' '}
                          {moment(thePlan.deadline).format('DD MMM YYYY')}
                        </span>
                      </p>
                      <p className="singleData">
                        Time left:{' '}
                        <span className="singleDataResult">
                          {moment(thePlan.deadline).diff(moment(), 'days') + 1}{' '}
                          days
                        </span>
                      </p>
                    </StatData> */}
                    <LineChartContainer>
                      <ResponsiveContainer aspect={4.0 / 3.0}>
                        <LineChart
                          width={400}
                          height={200}
                          maintainAspectRatio={false}
                          responsive={true}
                          data={modifiedData}
                          // margin={{ top: 45, right: 20, left: 10, bottom: 0 }}
                        >
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 14, fill: '#3b444b' }}
                          />
                          <YAxis
                            type="number"
                            domain={[0, timeLeft]}
                            tick={{ fontSize: 14, fill: '#3b444b' }}
                          />
                          <Tooltip />
                          {/* <CartesianGrid stroke="#62696e" /> */}
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#b0b4b7"
                          />
                          <Line
                            type="monotone"
                            dataKey="daily task"
                            stroke="#3b444b"
                            yAxisId={0}
                            strokeWidth={3}
                            dot={false}
                          />
                          {/* <Legend wrapperStyle={{ fontSize: '18px' }} /> */}

                          {/* <Line type="monotone" dataKey="pv" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{r: 8}}/>
         <Line type="monotone" dataKey={this.state.vis ? 'uv' : 'uv_'} strokeOpacity={opacity.uv} 
         strokeWidth={4} stroke="#82ca9d" /> */}

                          {/* <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#387908"
                        yAxisId={1}
                      /> */}
                        </LineChart>
                      </ResponsiveContainer>
                    </LineChartContainer>

                    <p className="series">
                      The best series:{' '}
                      <span className="seriesResult">
                        {' '}
                        {maxValue} {maxValue === 1 ? 'day' : 'days'}
                      </span>
                    </p>

                    <StatData>
                      <p className="singleData">
                        Started at:{' '}
                        <span className="singleDataResult">
                          {startDate.format('DD MMM YYYY')}
                        </span>{' '}
                      </p>
                      <p className="singleData">
                        Planned deadline:{' '}
                        <span className="singleDataResult">
                          {' '}
                          {moment(thePlan.deadline).format('DD MMM YYYY')}
                        </span>
                      </p>
                      <p className="singleData">
                        Time left:{' '}
                        <span className="singleDataResult">
                          {moment(thePlan.deadline).diff(moment(), 'days') + 1}{' '}
                          days
                        </span>
                      </p>
                    </StatData>
                  </div>
                </Statistics>
              </DescriptionContainer>
              <ButtonContainer>
                <Link
                  to={{
                    pathname: `/plan/${formatGoal(thePlan.goal)}/edit`,
                    state: location.state
                  }}
                >
                  <EditButton>
                    <span>Edit Plan</span>
                  </EditButton>
                </Link>
              </ButtonContainer>
            </PlanContent>
          </div>
        </Box>
      </PlanContainer>
    </>
  );
};

export default PlanTemplate;
