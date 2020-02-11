import React from 'react';
// import { Router } from '@reach/router';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import PlanTemplate from './components/templates/PlanTemplate';
import PlanTemplateEdit from './components/templates/PlanTemplateEdit';
// import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';

import { AuthProvider } from './components/Auth';
import PrivateRoute from './components/PrivateRoute';

import Signup_Login2 from './components/pages/Signup_Login2';
import Login_SignUp from './components/pages/Login_Signup';

const AppRouter = () => {
  return (
    // <div>
    <AuthProvider>
      <Router>
        <div style={{ height: '100%', width: '100%' }}>
          {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
          <Route exact path="/" component={Signup_Login2} />
          <Route exact path="/login" component={Login_SignUp} />
          <Route exact path="/about" component={About} />
          <PrivateRoute path="/plan/:goal" component={PlanTemplate} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
