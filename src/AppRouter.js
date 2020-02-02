import React from 'react';
import { Router } from '@reach/router';
import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import PlanTemplate from './components/templates/PlanTemplate';

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Dashboard path="/" />
        <PlanTemplate path="/plan/:goal" />
        <About path="about" />
      </Router>
    </div>
  );
};

export default AppRouter;
