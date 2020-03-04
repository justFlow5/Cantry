import React, { useState, useEffect, useReducer, useContext } from 'react';
import styled from 'styled-components';
// import { Link } from '@reach/router';
import { Link } from 'react-router-dom';
import moment from 'moment';

import uuid from 'uuid';
import PlanContext from '../contexts/Plan-context';
import { createGlobalStyle } from 'styled-components';
import plansReducer from '../reducers/PlansReducer';
import Sloth from '../sloth.png';

import Quote from '../QuoteGenerator.js';
import Accordion from '../Plan';
import Button from '../Button.js';
import Navbar from '../Navbar.js';
import SideNavbar from '../SideNavbar.js';
import Loader from '../Loader';
// import { getFirebase } from '../../firebase/Firebase';
import Modal from '../Modal2';
import db from '../../firebase/Firebase';
import { AuthContext } from '../contexts/Auth';
import { FuncContext, device } from '../contexts/FunctionsProvider';

// const GlobalStyles = createGlobalStyle`
// @import url(https://fonts.googleapis.com/css?family=Lora);
//   blockquote {
//     font-family: 'Notable', sans-serif;
//   }
// `;

// const getPlan = () => {
//   const newPlans = localStorage.getItem('plans');
//   if (newPlans) {
//     return setPlans(JSON.parse(newPlans));
//   }
// };

// import Navbar from "../components/navbar"
const ContentContainer = styled.div`
  @media ${device.mobileS} {
    width: 100%;
    display: flex;
    flex-direction: column;

    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @media ${device.laptop} {
    margin-left: 200px;
    /* position: relative; */
    /* left: 200px; */
  }
`;

const PlanContainer = styled.section`
  @media ${device.mobileS} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 85%;
    font-size: 24px;
    align-self: flex-start;
    margin: 10px auto; /* margin-bottom: 50px; */
  }

  @media ${device.mobileM} {
    font-size: 24px;
    margin: 20px auto;
    width: 80%;
  }

  @media ${device.mobileL} {
    font-size: 25px;
    margin: 20px auto;
    width: 70%;
  }

  @media ${device.tablet} {
    font-size: 27px;
    width: 55%;
  }

  @media ${device.laptop} {
    width: 50%;
    margin: 30px auto 50px;
  }

  @media ${device.laptopL} {
    width: 45%;
  }

  @media ${device.desktop} {
  }
  h3 {
    @media ${device.mobileS} {
      font-size: 24px;
      font-weight: 400;
      letter-spacing: 0.9px;
      margin-bottom: 10px;
    }

    @media ${device.mobileL} {
      font-size: 25px;
    }

    @media ${device.tablet} {
      font-size: 27px;
    }

    @media ${device.laptop} {
      font-size: 30px;
    }

    @media ${device.laptopL} {
      font-size: 32px;
    }

    @media ${device.desktop} {
      font-size: 45px;
    }
  }

  hr {
    @media ${device.mobileS} {
      width: 30%;
      position: relative;
      background: #1d2122;
      margin: 0;
      height: 4px;
      top: -3px;
    }

    @media ${device.mobileL} {
      width: 20%;
    }

    @media ${device.tablet} {
      width: 16%;
    }

    @media ${device.laptop} {
      width: 13%;
    }

    @media ${device.laptopL} {
      width: 13%;
    }

    @media ${device.desktop} {
    }
  }
`;

const Plan = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #eaeff0;
  background-color: rgba(244, 244, 244, 0.7);
  list-style-type: none;
  margin: 15px;
`;

const ButtonContainer = styled.section`
  margin-top: auto;
  /* margin-bottom: 50px; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 0px 10%;
`;

const DashBoard = styled.main`
  width: 100%;
  /* min-height: 100%; */
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  background: #f4f4f4;
  background: rgba(244, 244, 244, 0.7);
`;

const NoPlan = styled.div`
  width: 100%;
  margin-top: 50px;
  /* margin-bottom: auto; */

  text-align: center;

  & p {
    font-size: 25px;
  }
`;

const SadFace = styled.div`
  display: inline-block;
  margin-bottom: 2px solid black;
  padding: 0 5px;

  & > img {
    /* margin-top: 10px; */
    width: 100px;
    height: 100px;
  }
  /* width: 45px;
  height: 45px;
 
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 200; */
  & > svg {
    margin-top: 10px;
    width: 45px;
    height: 45px;
  }
`;

export default props => {
  const { currentUser } = useContext(AuthContext);
  const {
    plans,
    goal,
    specificators,
    prices,
    dailyTask,
    deadline,
    setGoal,
    setSpecificators,
    setPrices,
    setDailyTask,
    setDeadline,

    planJobs,
    setPlanJobs,

    updatePlan,

    dispatch,
    checkData,

    deleteSpec
  } = useContext(FuncContext);

  const [step, setStep] = useState(1);

  // const [plans, dispatch] = useReducer(plansReducer, [], () => {
  //   const localPlans = localStorage.getItem('plans');
  //   if (localPlans) {
  //     console.log('LOCAL PLANS', localPlans);
  //     return JSON.parse(localPlans);
  //   } else {
  //     return [];
  //   }
  // });

  const [singleSpec, setSingleSpec] = useState('');
  // const [prices, setPrices] = useState([]);
  const [singlePrice, setSinglePrice] = useState('');

  // const [dailyTask, setDailyTask] = useState('');

  const [singlePlanJob, setSinglePlanJob] = useState('');
  const [singlePlanJobDifficulty, setSinglePlanJobDifficulty] = useState(1);

  // const [dailyTasks, setDailyTasks] = useState([]);

  // const [deadline, setDeadline] = useState(null);

  const [isComplete, setIsComplete] = useState(false);

  const [isLoader, setIsLoader] = useState(true);

  const [isActive, setIsActive] = useState('');

  const addPlan = () => {
    const newPlan = {
      goal,
      deadline: deadline.valueOf()
    };

    var key;

    db.ref(`users/${currentUser.uid}/plans`)
      .push(newPlan)
      .then(snap => {
        key = snap.key;

        let newnewPlans = {
          id: key,
          goal,
          deadline: deadline.valueOf(),
          specificators,
          prices,
          dailyTask,
          planJobs
        };

        dispatch({
          type: 'ADD_PLAN',
          plans,
          ...newnewPlans
        });
        const upPlans = [...plans, newnewPlans];
        localStorage.setItem('plans', JSON.stringify(upPlans));
      })

      .then(() => {
        db.ref(`users/${currentUser.uid}/plans/${key}/specificators`).set(
          specificators
        );

        db.ref(`users/${currentUser.uid}/plans/${key}/prices`).set(prices);

        db.ref(`users/${currentUser.uid}/plans/${key}/dailyTask`).set(
          dailyTask
        );

        db.ref(`users/${currentUser.uid}/plans/${key}/planJobs`).set(planJobs);
      })

      .then(() => {
        const specificatorsDb = [];
        const pricesDb = [];
        var dailyTaskDb;
        const planJobsDb = [];

        db.ref(`users/${currentUser.uid}/plans/${key}/specificators`)
          .once('value')
          .then(childchildSnapshot => {
            childchildSnapshot.forEach(spec => {
              specificatorsDb.push(
                // id: spec.key,
                spec.val()
              );
            });
          });

        db.ref(`users/${currentUser.uid}/plans/${key}/prices`)
          .once('value')
          .then(childchildSnapshot => {
            childchildSnapshot.forEach(price => {
              pricesDb.push(
                // id: price.key,
                price.val()
              );
            });
          });

        db.ref(`users/${currentUser.uid}/plans/${key}/dailyTask`)
          .once('value')
          .then(childchildSnapshot => {
            dailyTaskDb = childchildSnapshot.val();
          });

        db.ref(`users/${currentUser.uid}/plans/${key}/planJobs`)
          .once('value')
          .then(childchildSnapshot => {
            childchildSnapshot.forEach(planJob => {
              planJobsDb.push(
                // id: task.key,
                planJob.val()
              );
            });
          });

        return {
          id: key,
          goal: newPlan.goal,
          deadline: newPlan.deadline,
          specificators: specificatorsDb,
          prices: pricesDb,
          dailyTask: dailyTaskDb,
          planJobs: planJobsDb
        };
      })
      // .then(data => {
      //   dispatch({
      //     type: 'ADD_PLAN',
      //     plans,
      //     ...data
      //   });
      // })
      .then(() => {
        setGoal('');
        setSpecificators([]);
        setPrices([]);
        setDeadline('');
        setDailyTask('');
        setPlanJobs([]);
        setIsActive('');
        setStep(1);
      });
  };

  const toggleLoader = () => {
    if (isLoader) setIsLoader(false);
  };

  const addSpec = () => {
    const id = uuid();
    setSpecificators([...specificators, { singleSpec, id }]); //temporary specificator -- no need for stable/secure id
    setSingleSpec('');
  };

  const addPrice = () => {
    const id = uuid();
    setPrices([...prices, { singlePrice, id }]); //temporary specificator -- no need for stable/secure id]);
    setSinglePrice('');
  };

  const addSinglePlanJob = () => {
    const id = uuid();
    setPlanJobs([
      ...planJobs,
      {
        singlePlanJob,
        completed: false,
        difficulty: singlePlanJobDifficulty,
        id
      }
    ]);

    setSinglePlanJob('');
    setSinglePlanJobDifficulty(1);
  };

  const deleteTempPrice = id => {
    const filteredPrices = prices.filter(price => {
      return price.id !== id;
    });
    setPrices(filteredPrices);
  };

  const deleteTempSpec = id => {
    const filteredSpecs = specificators.filter(spec => {
      return spec.id !== id;
    });
    setSpecificators(filteredSpecs);
  };

  // const deleteTempTask = id => {
  //   const filteredTasks = dailyTasks.filter(task => {
  //     return task.id !== id;
  //   });
  //   setDailyTasks(filteredTasks);
  // };

  const deleteTempSinglePlanTask = id => {
    const filteredPlanJobs = planJobs.filter(planJob => {
      return planJob.id !== id;
    });
    setPlanJobs(filteredPlanJobs);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    getDataFromDb();
  }, []);

  // useEffect(() => {
  //   getDataFromDb();
  // }, [checkData]);

  const getDataFromDb = async () => {
    // console.log('DB FROM FUNCTION: ', db);
    // console.log()
    const plansRef = db.ref(`users/${currentUser.uid}/plans`);
    const plansSnapshot = await plansRef.once('value');

    var plansLength;

    if (plansSnapshot.val()) {
      plansLength = Object.keys(plansSnapshot.val()).length;
    } else {
      setIsComplete(true);
      return;
    }
    // const plansLength = Object.keys(plansSnapshot.val()).length;
    const plansDb = [];

    //check if database has data
    // if (plansSnapshot.val()) {
    //   setIsDb(true);
    //   plansLength = Object.keys(plansSnapshot.val()).length;
    // } else {
    //   setIsDb(false);
    //   return;
    // }

    // putting async keyword before childsnapshot function makes it unable to loop with forEach more than once
    plansSnapshot.forEach(childSnapshot => {
      (async () => {
        const idDb = childSnapshot.key;

        const goalRef = db.ref(
          `users/${currentUser.uid}/plans/${childSnapshot.key}/goal`
        );
        const goalSnapshot = await goalRef.once('value');
        const goalDb = goalSnapshot.val();

        const deadlineRef = db.ref(
          `users/${currentUser.uid}/plans/${childSnapshot.key}/deadline`
        );
        const deadlineSnapshot = await deadlineRef.once('value');
        const deadlineDb = deadlineSnapshot.val();

        const specificatorsDb = [];
        const specificatorsRef = db.ref(
          `users/${currentUser.uid}/plans/${childSnapshot.key}/specificators`
        );
        const specificatorsSnapshot = await specificatorsRef.once('value');
        specificatorsSnapshot.forEach(spec => {
          specificatorsDb.push(
            // id: spec.key,
            spec.val()
          );
        });

        const pricesDb = [];
        const pricesRef = db.ref(
          `users/${currentUser.uid}/plans/${childSnapshot.key}/prices`
        );
        const pricesSnapshot = await pricesRef.once('value');
        pricesSnapshot.forEach(price => {
          pricesDb.push(
            // id: price.key,
            price.val()
          );
        });

        let dailyTaskDb;
        const dailyTaskRef = db.ref(
          `users/${currentUser.uid}/plans/${childSnapshot.key}/dailyTask`
        );
        const dailyTaskSnapshot = await dailyTaskRef.once('value');

        dailyTaskDb = dailyTaskSnapshot.val();

        const planJobsDb = [];
        const planJobRef = db.ref(
          `users/${currentUser.uid}/plans/${childSnapshot.key}/planJobs`
        );
        const planJobSnapshot = await planJobRef.once('value');
        planJobSnapshot.forEach(planJob => {
          planJobsDb.push(
            // id: task.key,
            planJob.val()
          );
        });

        plansDb.push({
          id: idDb,
          goal: goalDb,
          deadline: deadlineDb,
          specificators: specificatorsDb,
          prices: pricesDb,
          dailyTask: dailyTaskDb,
          planJobs: planJobsDb
        });
        dispatch({ type: 'LOAD_DB_PLANS', plansDb });
        // console.log('LENGTHof PansDB: ', plansDb.length);
        if (plansDb.length === plansLength) {
          dispatch({ type: 'LOAD_DB_PLANS', plansDb });
          setIsComplete(true);

          //save data in local storage

          // localStorage.setItem('plans', JSON.stringify(plansDb));
        }
        localStorage.setItem('plans', JSON.stringify(plansDb));
      })();
      // localStorage.setItem('plans', JSON.stringify(plansDb));
    });
  };

  return (
    <PlanContext.Provider
      value={{
        step,
        setStep,
        nextStep,
        prevStep,
        //
        singleSpec,
        setSingleSpec,
        addSpec,
        deleteTempSpec,
        //
        singlePrice,
        setSinglePrice,
        addPrice,
        deleteTempPrice,
        //
        isActive,
        setIsActive,
        //
        addPlan,
        //
        dailyTask,
        setDailyTask,

        // addTask,
        // deleteTempTask,
        //
        singlePlanJob,
        setSinglePlanJob,
        addSinglePlanJob,
        deleteTempSinglePlanTask,
        singlePlanJobDifficulty,
        setSinglePlanJobDifficulty
      }}
    >
      <Navbar />
      <DashBoard>
        <SideNavbar></SideNavbar>
        <ContentContainer>
          <Quote />

          <PlanContainer>
            {plans.length === 0 && isLoader && <Loader />}

            {(() => {
              //if local storage is filled with plans
              if (plans.length > 0) {
                toggleLoader();
                return (
                  <div>
                    <h3>List Of Plans</h3>
                    <hr></hr>
                  </div>
                );
              }
              // no plans in local storage - wait for response from db query
              else if (isComplete) {
                // after quer to db - is there data that has been received?
                if (plans.length > 0) {
                  toggleLoader();
                  return (
                    <div>
                      <h3>List Of Plans</h3>
                      <hr></hr>
                    </div>
                  );
                } else {
                  toggleLoader();
                  return (
                    <NoPlan>
                      <p>No plan created yet</p>

                      <SadFace>
                        <img src={Sloth} alt="Sloth" />
                      </SadFace>
                    </NoPlan>
                  );
                }
              }
            })()}

            <Plan>
              {plans.map(plan => {
                //  check if it's a new day - if so - update accordingly
                checkData(plan.id);
                return <Accordion plan={plan} key={plan.id} />;
              })}
            </Plan>
          </PlanContainer>
          <ButtonContainer>
            {/*  test*/}
            {/* <button
              style={{ width: '80px', height: '60px' }}
              onClick={() => {
                var id = '-M1ULZgDTGAWMGDtDy5s';
                var dataDb;
                var newData;
                db.ref(
                  `users/${currentUser.uid}/plans/${id}/dailyTask/startedAt`
                )
                  .once('value')
                  .then(snapshot => {
                    dataDb = snapshot.val();
                    // console.log('dataDbdataDbdataDb: ', snapshot.val());
                    return dataDb;
                  })
                  .then(dataDb => {
                    console.log('dataDbdataDbdataDb: ', dataDb);
                  })
                  .then(() => {
                    var b = moment(dataDb)
                      .clone()
                      .add(1, 'days');
                    let newData = moment(dataDb).add(1, 'days');
                    let ms = newData.valueOf();
                    console.log('OLD: ', newData);
                    // console.log('NEWWWW DATA ', newData);
                    // console.log('?????????????: ', b.valueOf());
                    console.log(
                      'BEFORE ADDING: ',
                      moment(dataDb).format('DD-MM-YYYY')
                    );
                    console.log(
                      'ms&&&&&&&&&&&&&&&L ',
                      moment(ms).format('DD-MM-YYYY')
                    );
                    db.ref(
                      `users/${currentUser.uid}/plans/${id}/dailyTask/startedAt`
                    ).set(ms);
                    checkData(id);
                    getDataFromDb();
                  });
              }}
            >
              ADD DAY
            </button>
            <button
              style={{ width: '80px', height: '60px' }}
              onClick={() => {
                var id = '-M1ULZgDTGAWMGDtDy5s';
                var dataDb;
                var newData;
                db.ref(
                  `users/${currentUser.uid}/plans/${id}/dailyTask/startedAt`
                )
                  .once('value')
                  .then(snapshot => {
                    dataDb = snapshot.val();
                    // console.log('dataDbdataDbdataDb: ', snapshot.val());
                    return dataDb;
                  })
                  .then(dataDb => {
                    console.log('dataDbdataDbdataDb: ', dataDb);
                  })
                  .then(() => {
                    var b = moment(dataDb)
                      .clone()
                      .add(1, 'days');
                    let newData = moment(dataDb).subtract(1, 'days');
                    let ms = newData.valueOf();
                    console.log('OLD: ', newData);
                    // console.log('NEWWWW DATA ', newData);
                    console.log('?????????????: ', b.valueOf());
                    console.log(
                      'BEFORE ADDING: ',
                      moment(dataDb).format('DD-MM-YYYY')
                    );
                    console.log(
                      'ms&&&&&&&&&&&&&&&L ',
                      moment(ms).format('DD-MM-YYYY')
                    );
                    db.ref(
                      `users/${currentUser.uid}/plans/${id}/dailyTask/startedAt`
                    ).set(ms);
                    checkData(id);
                    getDataFromDb();
                  });
              }}
            >
              SUBTRACT DAY
            </button> */}
            {/*  */}
            <Modal />

            <Link to="/organizer">
              <Button
                content="Go to organizer"
                // width="285px"
                mark="\00bb"
                scale="1.6"
              />
            </Link>
          </ButtonContainer>
        </ContentContainer>
      </DashBoard>
    </PlanContext.Provider>
  );
};
