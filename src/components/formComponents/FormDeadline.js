import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import 'react-dates/initialize';
import './_datepicker_custom.css';

import { SingleDatePicker } from 'react-dates';

import PlanContext from '../Plan-context';
import InputField from './InputField';
import Request from './Request';

import ButtonBack from '../Button2';
import AddButton from './AddInputButton';
import ButtonNext from '../Button';

// import SingleDatePicker from './singleDatePicker';

const ButtonNextContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 30px;
`;

const ButtonBackContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 30px;
  > button {
    /* position: absolute; */
  }
`;
const CalendarContainer = styled.div`
  /* margin: 0 auto; */
  margin: 30px auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
export default props => {
  const {
    deadline,
    setDeadline,
    nextStep,
    prevStep,
    plans,
    goal,
    specificators,
    prices,
    addPlan
  } = useContext(PlanContext);

  // const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(null);
  // const [date, setDate] = useState(null);

  const onDateChange = newDeadline => {
    if (newDeadline) {
      setDeadline(newDeadline);
    }
  };

  return (
    <>
      <Request
        htmlFor="deadline"
        title="Goals are dreams with deadlines"
        subtext="Setting a deadline takes you from the thinking to planning.
        A deadline is a commitment. Let's reshape your dream into goal by giving them deadlines:"
      ></Request>
      {/* <InputField
        value={deadline}
        id="deadline"
        action={setDeadline}
        title="Deadline"
      /> */}
      <CalendarContainer>
        <SingleDatePicker
          date={deadline} // momentPropTypes.momentObj or null
          onDateChange={date => onDateChange(date)} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequiredfunc.isRequired
          id="mydatepicker" // PropTypes.string.isRequired,
          displayFormat={'DD-MM-YYYY'}
          numberOfMonths={1}
          openDirection="down"
          hideKeyboardShortcutsPanel={true}
          showDefaultInputIcon={true}
          // showClearDate={true}
          // reopenPickerOnClearDates={true}
          // withPortal={true}
        />
      </CalendarContainer>

      <ButtonBackContainer>
        <ButtonBack
          rotate="180deg"
          action={prevStep}
          content="BACK"
          width="150px"
          mark="\00bb"
          scale="3"
        ></ButtonBack>
      </ButtonBackContainer>
      <ButtonNextContainer>
        <ButtonNext
          action={addPlan}
          content="CREATE PLAN"
          mark="\2714"
          width="250px"
          scale="1.2"
        ></ButtonNext>
      </ButtonNextContainer>

      {/* {props.isComplete?  <Router>
        <PlanTemplate path="/plan/profile" plan={plans[plans.length - 1]}/>
       
      </Router> : null } */}
      {/* {props.isComplete && <PlanTemplate plan={plans[plans.length - 1]} />} */}
    </>
  );
};
