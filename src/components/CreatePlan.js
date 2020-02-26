import React, { useState, useContext } from 'react';
import PlanContext from './contexts/Plan-context';

import FormGoal from './formComponents/FormGoal';
import FormSpecifics from './formComponents/FormSpecifics';
import FormPrice from './formComponents/FormPrice';
import FormDeadline from './formComponents/FormDeadline';
import FormDailyTask from './formComponents/FormDailyTask';
import FormStrategy from './formComponents/FormStrategy';

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
      return <FormStrategy />;
    case 6:
      return <FormDeadline />;
  }
};
