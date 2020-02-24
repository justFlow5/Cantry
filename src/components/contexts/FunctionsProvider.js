import React, { useEffect, useState, useContext, useReducer } from 'react';
import { AuthContext } from './Auth';

import db from '../../firebase/Firebase';
import plansReducer from '../reducers/PlansReducer';

export const FuncContext = React.createContext();

export const FunctionsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const [plans, dispatch] = useReducer(plansReducer, [], () => {
    const localPlans = localStorage.getItem('plans');
    if (localPlans) {
      console.log('LOCAL PLANS', localPlans);
      return JSON.parse(localPlans);
    } else {
      return [];
    }
  });

  const [goal, setGoal] = useState('');
  const [specificators, setSpecificators] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [deadline, setDeadline] = useState(null);

  // QUOTES SECTION
  const [quoteOption, setQuoteOption] = useState('');

  const [singleQuoteDb, setSingleQuoteDb] = useState('');

  const [quotesDb, setQuotesDb] = useState([]);

  const updatePlan = (id, updatedPlan) => {
    // const updatedPlan = {
    //   id,
    //   goal,
    //   specificators,
    //   prices,
    //   dailyTasks,
    //   deadline
    // };
    db.ref(`users/${currentUser.uid}/plans/${id}`).update({
      goal: updatedPlan.goal,
      deadline: updatedPlan.deadline,
      specificators: updatedPlan.specificators,
      prices: updatedPlan.prices,
      dailyTasks: updatedPlan.dailyTasks,
      id: id
    });

    const updatedPlans = plans.map(plan => {
      if (plan.id === id) {
        return updatedPlan;
      } else {
        return plan;
      }
    });
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

  // console.log(quoteOption);

  useEffect(() => {
    currentUser && getQuotes();
  }, [currentUser]);

  {
    // console.log('QUOTES: ', quotes);
    // console.log()
    // console.log()
  }
  return (
    <FuncContext.Provider
      value={{
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
        removePlan,

        dispatch,
        //

        quoteOption,
        setQuoteOption,
        singleQuoteDb,
        setSingleQuoteDb,
        quotesDb,
        setQuotesDb
      }}
    >
      {children}
    </FuncContext.Provider>
  );
};
