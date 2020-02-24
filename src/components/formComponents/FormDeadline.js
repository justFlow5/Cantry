import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import './datepickerDeadline.css';

import PlanContext from '../contexts/Plan-context';
import { FuncContext } from '../contexts/FunctionsProvider';

import InputField from './InputField';
import Request from './Request';

import ButtonBack from '../Button2';
import AddButton from './AddInputButton';
import ButtonNext from '../Button';

import NavigationArrow from './NavigationArrow';

// import SingleDatePicker from './singleDatePicker';

const ButtonNextContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 30px;
`;

const ButtonBackContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 8%;
`;
const CalendarContainer = styled.div`
  /* margin: 0 auto; */
  margin: 30px auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
export default props => {
  const { prevStep, addPlan } = useContext(PlanContext);

  const { deadline, setDeadline } = useContext(FuncContext);

  const [focused, setFocused] = useState(null);

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
        <NavigationArrow
          nextContent="Set Daily Tasks"
          nextStep={prevStep}
          arrowDirection="left"
        />
      </ButtonBackContainer>
      <ButtonNextContainer>
        <ButtonNext
          action={addPlan}
          content="CREATE PLAN"
          mark="\2714"
          width="250px"
          scale="1.2"
          // disabled={deadline.length > 0 ? false : true}
          disabled={moment.isMoment(deadline) ? false : true}
        ></ButtonNext>
      </ButtonNextContainer>

      {/* {props.isComplete?  <Router>
        <PlanTemplate path="/plan/profile" plan={plans[plans.length - 1]}/>
       
      </Router> : null } */}
      {/* {props.isComplete && <PlanTemplate plan={plans[plans.length - 1]} />} */}
    </>
  );
};
