import React, { useState, useContext } from 'react';
import PlanContext from './Plan-context';

import FormGoal from './formComponents/FormGoal';
import FormSpecifics from './formComponents/FormSpecifics';
import FormPrice from './formComponents/FormPrice';
import FormDeadline from './formComponents/FormDeadline';
import FormDailyTask from './formComponents/FormDailyTask';

export default props => {
  const { step } = useContext(PlanContext);
  switch (step) {
    case 1:
      return <FormGoal />;
    case 2:
      return <FormSpecifics />;
    case 3:
      return <FormPrice />;
    case 4:
      return <FormDailyTask />;
    case 5:
      return <FormDeadline />;
  }
};
