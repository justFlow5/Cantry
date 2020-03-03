import React, { useEffect, useState, useContext, useReducer } from 'react';
import { AuthContext } from './Auth';

import db from '../../firebase/Firebase';
import plansReducer from '../reducers/PlansReducer';
import moment from 'moment';
import uuid from 'uuid';

export const FuncContext = React.createContext();

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

export const FunctionsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const [plans, dispatch] = useReducer(plansReducer, [], () => {
    const localPlans = localStorage.getItem('plans');
    if (localPlans) {
      // console.log('LOCAL PLANS', localPlans);
      return JSON.parse(localPlans);
    } else {
      return [];
    }
  });

  const [goal, setGoal] = useState('');
  const [specificators, setSpecificators] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dailyTask, setDailyTask] = useState('');

  const [planJobs, setPlanJobs] = useState([]);

  const [deadline, setDeadline] = useState(null);

  // QUOTES SECTION
  const [quoteOption, setQuoteOption] = useState('');

  const [singleQuoteDb, setSingleQuoteDb] = useState('');

  const [quotesDb, setQuotesDb] = useState([]);

  const [tempDailyTask, setTempDailyTask] = useState('');

  const updatePlanJobs = (id, updatedPlanJobs) => {
    db.ref(`users/${currentUser.uid}/plans/${id}`).update({
      planJobs: updatedPlanJobs
    });

    const updatedPlans = plans.map(plan => {
      if (plan.id === id) {
        let updatedPlan = plan;
        updatedPlan.planJobs = updatedPlanJobs;
        return updatedPlan;
      } else {
        return plan;
      }
    });
    dispatch({ type: 'UPDATE_PLAN', updatedPlans });
  };

  const updatePlan = (id, updatedPlan) => {
    db.ref(`users/${currentUser.uid}/plans/${id}`).update({
      goal: updatedPlan.goal,
      deadline: updatedPlan.deadline,
      specificators: updatedPlan.specificators,
      prices: updatedPlan.prices,
      dailyTask: updatedPlan.dailyTask,

      //
      //
      id: id
    });
    console.log('UPDATE PLANA', updatedPlan);
    const updatedPlans = plans.map(plan => {
      if (plan.id === id) {
        return updatedPlan;
      } else {
        return plan;
      }
    });
    localStorage.setItem('plans', JSON.stringify(updatedPlans));
    dispatch({ type: 'UPDATE_PLAN', updatedPlans });
  };

  const removePlan = id => {
    db.ref(`users/${currentUser.uid}/plans/${id}`).set(null);

    const updatedPlans = plans.filter(plan => {
      return plan.id !== id;
    });

    dispatch({ type: 'UPDATE_PLAN', updatedPlans });

    localStorage.setItem('plans', updatedPlans);
  };

  const getQuotes = () => {
    var status = localStorage.getItem('quoteStatus');
    //if local storage does not have status value - login on new device
    if (!status) {
      db.ref(`users/${currentUser.uid}/quotes/status`)
        .once('value')
        .then(snapshot => {
          status = snapshot.val();
          if (status) localStorage.setItem('quoteStatus', status);
          // return snapshot.val();
        });
    }

    //
    db.ref(`users/${currentUser.uid}/quotes/${status}`)
      .once('value')
      .then(childSnapshot => {
        // console.log('ALL MANY QUOTES: ', childSnapshot.val());
        // console.log('QUOTE OPTION: ', quoteOption);

        // if (quoteOption === 'one') {
        if (status === 'one') {
          // console.log('HIII, one ', quoteOption);
          const oneQuote = childSnapshot.val();
          setSingleQuoteDb(oneQuote);

          localStorage.setItem('quoteOne', JSON.stringify(oneQuote));
          // } else if (quoteOption === 'many') {
        } else if (status === 'many') {
          // console.log('HIII, two ', status);

          const manyQuotes = [];
          childSnapshot.forEach(quote => {
            manyQuotes.push(quote.val());
          });
          setQuotesDb(manyQuotes);
          localStorage.setItem('quoteMany', JSON.stringify(manyQuotes));
        }
      });
  };

  const addTask = () => {
    const id = uuid();
    // const startedAt = moment().valueOf();
    const startedAt = moment().valueOf();

    const now = moment().format('DD-MM-YYYY');

    setDailyTask({
      dailyTask: tempDailyTask,
      id,
      startedAt,
      history: [{ [now]: false }],
      completed: false
    });

    setTempDailyTask('');

    // setDailyTask('');
  };

  const editTask = (planId, updatedTask) => {
    // console.log('planId, updatedTask', planId, updatedTask);
    plans.forEach(plan => {
      if (plan.id === planId) {
        let tempPlan = plan;

        tempPlan.dailyTask.completed = updatedTask;

        let stringifiedData = moment()
          .format('DD-MM-YYYY')
          .toString();

        // updatePlan(planId, tempPlan);
        // console.log('stringifiedData', stringifiedData);

        // let id = uuid()

        let isDate = tempPlan.dailyTask.history.some(date => {
          if (Object.keys(date)[0] === stringifiedData) {
            let thisDate = Object.keys(date)[0];
            // if (updatedTask) {
            tempPlan.dailyTask.history.forEach(ddate => {
              // if (Object.keys(date)[0] === thisDate)
              if (thisDate in ddate) ddate[thisDate] = updatedTask;
            });
            // }
            return Object.keys(date)[0] === stringifiedData;
          }
        });

        let newData = { [stringifiedData]: updatedTask };

        console.log('ISS DATEEE:, ', isDate);

        if (isDate) {
          updatePlan(planId, tempPlan);
        } else {
          tempPlan.dailyTask.history.push(newData);

          updatePlan(planId, tempPlan);
        }
      }
    });
  };

  const checkData = id => {
    var isToggled;
    var dataDb;
    db.ref(`users/${currentUser.uid}/plans/${id}/dailyTask/completed`)
      .once('value')
      .then(snapshot => {
        isToggled = snapshot.val();
      });

    db.ref(`users/${currentUser.uid}/plans/${id}/dailyTask/startedAt`)
      .once('value')
      .then(snapshot => {
        dataDb = snapshot.val();
        // var newUpDate = { [dataDb]: isToggled };

        const now = moment().valueOf();

        const nextDay = moment(now).isAfter(dataDb, 'day');

        console.log('NEXT DAY', nextDay);

        if (nextDay) {
          db.ref(
            `users/${currentUser.uid}/plans/${id}/dailyTask/completed`
          ).set(false);

          db.ref(
            `users/${currentUser.uid}/plans/${id}/dailyTask/startedAt`
          ).set(now);
        }
      });
  };

  useEffect(() => {
    currentUser && getQuotes();
  }, [currentUser]);

  return (
    <FuncContext.Provider
      value={{
        plans,
        goal,
        specificators,
        prices,
        dailyTask,
        addTask,
        deadline,
        setGoal,
        setSpecificators,
        setPrices,
        setDailyTask,
        setDeadline,
        updatePlan,
        removePlan,

        tempDailyTask,
        setTempDailyTask,
        editTask,

        //
        planJobs,
        setPlanJobs,
        updatePlanJobs,

        dispatch,
        //

        quoteOption,
        setQuoteOption,
        singleQuoteDb,
        setSingleQuoteDb,
        quotesDb,
        setQuotesDb,

        checkData
      }}
    >
      {children}
    </FuncContext.Provider>
  );
};
