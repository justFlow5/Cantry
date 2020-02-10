import React from 'react';
// import { Router } from '@reach/router';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import PlanTemplate from './components/templates/PlanTemplate';
import PlanTemplateEdit from './components/templates/PlanTemplateEdit';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';

import { AuthProvider } from './components/Auth';
import PrivateRoute from './components/PrivateRoute';

const AppRouter = () => {
  return (
    // <div>
    <AuthProvider>
      <Router>
        <div>
          {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/plan/:goal" component={PlanTemplate} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
