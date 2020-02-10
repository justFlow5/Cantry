import React from 'react';
// import { Router } from '@reach/router';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import PlanTemplate from './components/templates/PlanTemplate';
import PlanTemplateEdit from './components/templates/PlanTemplateEdit';
import LoginPage from './components/pages/LoginPage';

const AppRouter = () => {
  return (
    // <div>
    <Router>
      <div>
        {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
        <Route exact path="/" component={LoginPage} />
        {/* <Route exact path="/signup" component={SignUp} /> */}
        <Route exact path="/about" component={About} />
        <Route path="/plan/:goal" component={PlanTemplate} />
      </div>
    </Router>
  );
};

export default AppRouter;
