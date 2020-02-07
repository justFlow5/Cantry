import React from 'react';
import { Router } from '@reach/router';
import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import PlanTemplate from './components/templates/PlanTemplate';
import PlanTemplateEdit from './components/templates/PlanTemplateEdit';
import LoginPage from './components/pages/LoginPage';

const AppRouter = () => {
  return (
    <div>
      <Router>
        <LoginPage path="/" />
        <Dashboard path="/dashboard" />
        <PlanTemplate path="/plan/:goal" />
        {/* <PlanTemplateEdit path="/edit" /> */}
        {/* </PlanTemplate> */}
        <About path="about" />
      </Router>
    </div>
  );
};

export default AppRouter;
