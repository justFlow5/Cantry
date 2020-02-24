import React, { useState, useEffect, useReducer, useContext } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
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
import { FuncContext } from '../contexts/FunctionsProvider';

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
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  /* position: relative; */
  /* left: 200px; */
`;

const PlanContainer = styled.section`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  align-self: flex-start;
  margin-left: 270px;
  margin-bottom: 50px;

  h3 {
    font-size: 30px;
    font-weight: 400;
    letter-spacing: 0.9px;
    margin-bottom: 10px;
  }

  hr {
    width: 13%;
    position: relative;
    background: #1d2122;
    margin: 0;
    height: 4px;
    top: -3px;
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
    dailyTasks,
    deadline,
    setGoal,
    setSpecificators,
    setPrices,
    setDailyTasks,
    setDeadline,

    updatePlan,

    dispatch,

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

  const [dailyTask, setDailyTask] = useState('');
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
      })

      .then(() => {
        db.ref(`users/${currentUser.uid}/plans/${key}/specificators`).set(
          specificators
        );

        db.ref(`users/${currentUser.uid}/plans/${key}/prices`).set(prices);

        db.ref(`users/${currentUser.uid}/plans/${key}/dailyTasks`).set(
          dailyTasks
        );
      })

      .then(() => {
        const specificatorsDb = [];
        const pricesDb = [];
        const dailyTasksDb = [];

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

        db.ref(`users/${currentUser.uid}/plans/${key}/dailyTasks`)
          .once('value')
          .then(childchildSnapshot => {
            childchildSnapshot.forEach(task => {
              dailyTasksDb.push(
                // id: task.key,
                task.val()
              );
            });
          });

        return {
          id: key,
          goal: newPlan.goal,
          deadline: newPlan.deadline,
          specificators: specificatorsDb,
          prices: pricesDb,
          dailyTasks: dailyTasksDb
        };
      })
      .then(data => {
        dispatch({
          type: 'ADD_PLAN',
          plans,
          ...data
        });
      })
      .then(() => {
        setGoal('');
        setSpecificators([]);
        setPrices([]);
        setDeadline('');
        setDailyTasks([]);
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

  const addTask = () => {
    const id = uuid();
    setDailyTasks([...dailyTasks, { dailyTask, id }]);

    setDailyTask('');
  };

  // const updateSpecificators = (idPlan, idSpec, content) => {
  //   db.ref(`plans/${idPlan}/specificators/${idSpec}`).update(content);

  //   const updatedSpecs = specificators.map(spec => {
  //     if (spec.id === id) {
  //       return {
  //         singleSpec: content,
  //         id: spec.id
  //       };
  //     } else {
  //       return spec;
  //     }
  //   });
  //   setSpecificators(updatedSpecs);
  // };

  // const updatePrices = (id, content) => {
  //   const updatedPrices = prices.map(price => {
  //     if (price.id === id) {
  //       return {
  //         singlePrice: content,
  //         id: price.id
  //       };
  //     } else {
  //       return price;
  //     }
  //   });

  //   setPrices(updatedPrices);
  // };

  // const updateDailyTasks = (id, content) => {
  //   const updatedDailyTasks = dailyTasks.map(dailyTask => {
  //     if (dailyTask.id === id) {
  //       return {
  //         dailyTask: content,
  //         id: dailyTask.id
  //       };
  //     } else {
  //       return dailyTask;
  //     }
  //   });
  //   setDailyTasks(updatedDailyTasks);
  // };

  // const updatePlan = id => {
  //   const updatedPlan = {
  //     goal,
  //     specificators,
  //     prices,
  //     dailyTasks,
  //     deadline,
  //     id
  //   };
  //   db.ref(`users/${currentUser.uid}/plans/${id}`).update(updatedPlan);

  //   const updatedPlans = plans.map(plan => {
  //     if (plan.id === id) {
  //       return updatedPlan;
  //     } else {
  //       return plan;
  //     }
  //   });
  //   dispatch({ type: 'UPDATE_PLAN', updatedPlans });
  // };

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

  const deleteTempTask = id => {
    const filteredTasks = dailyTasks.filter(task => {
      return task.id !== id;
    });
    setDailyTasks(filteredTasks);
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

        const dailyTasksDb = [];
        const dailyTasksRef = db.ref(
          `users/${currentUser.uid}/plans/${childSnapshot.key}/dailyTasks`
        );
        const dailyTasksSnapshot = await dailyTasksRef.once('value');
        dailyTasksSnapshot.forEach(task => {
          dailyTasksDb.push(
            // id: task.key,
            task.val()
          );
        });

        plansDb.push({
          id: idDb,
          goal: goalDb,
          deadline: deadlineDb,
          specificators: specificatorsDb,
          prices: pricesDb,
          dailyTasks: dailyTasksDb
        });

        console.log('LENGTHof PansDB: ', plansDb.length);
        if (plansDb.length === plansLength) {
          dispatch({ type: 'LOAD_DB_PLANS', plansDb });
          setIsComplete(true);

          //save data in local storage

          localStorage.setItem('plans', JSON.stringify(plansDb));
        }
      })();
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
        addTask,
        deleteTempTask
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

            {/* <NoPlan>
                <p>No plan created yet</p>

                <SadFace>
                  <img src={Sloth} alt="Sloth" />
                 
                </SadFace>
              </NoPlan>
            ) : (
              <div>
                <h3>List Of Plans</h3>
                <hr></hr>
              </div>
            ) */}

            {/* <Loader /> */}
            <Plan>
              {plans.map(plan => {
                console.log('planplan: ', plan);
                return <Accordion plan={plan} key={plan.id} />;
              })}
            </Plan>
          </PlanContainer>
          <ButtonContainer>
            {/* <Link to="/createPlan/"> */}
            {/* <Button plus content="Create new plan" width="300px" mark='' /> */}
            {/* <div>plan: {JSON.stringify(plans)}</div> */}
            {/* <div>{JSON.stringify(specificators)}</div>
            {console.log('specificators:::: ', specificators)} */}
            {/* <button
              style={{
                position: 'asbolute',
                top: '0',
                right: '0',
                width: '300px',
                height: '300px',
                cursor: 'pointer'
              }}
              onClick={() => {
                deleteSpec(
                  '-M-k8WBxBljjRF6NlVoU',
                  '64982272-2519-4a41-a2db-856b030aeca5'
                );
              }}
            >
              delete
            </button> */}
            <Modal />

            {/* <div>daily Tasks: {JSON.stringify(dailyTasks)}</div> */}
            {/* <Button
              content="Create new plan"
              width="300px"
              mark="\002B"
              scale="1.6"
              // onClick={showForm ? null : setShowForm(true)}
              displayForm={displayForm}
              // toggleModal={toggleModal}
              onClick={toggleModal}
            >

            </Button> */}

            {/* </Link> */}
            <Link to="/plan/">
              <Button
                content="Go to organizer"
                width="285px"
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
