import React from 'react';
// import { Router } from '@reach/router';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import PlanTemplate from './components/templates/PlanTemplate';
import PlanTemplateEdit from './components/templates/PlanTemplateEdit';
// import Login from './components/pages/Login';

import { AuthProvider } from './components/contexts/Auth';

import { FunctionsProvider } from './components/contexts/FunctionsProvider';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import Signup_Login2 from './components/pages/Signup_Login2';
import Login_SignUp from './components/pages/Login_Signup';
import QuoteSettings from './components/pages/QuoteSettings';
import Organizer from './components/pages/Organizer';

import Strategy from './components/Strategy';

const AppRouter = () => {
  return (
    // <div>
    <AuthProvider>
      <Router>
        <div style={{ height: '100%', width: '100%' }}>
          {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
          <PublicRoute exact path="/" component={Signup_Login2} />
          <Route exact path="/login" component={Login_SignUp} />
          <PrivateRoute exact path="/about" component={About} />
          <FunctionsProvider>
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute exact path="/plan/:goal" component={PlanTemplate} />
            <PrivateRoute
              exact
              path="/dashboard/quote-settings"
              component={QuoteSettings}
            />
            <PrivateRoute
              exact
              path="/plan/:goal/tactic"
              component={Strategy}
            />
            <PrivateRoute exact path="/organizer" component={Organizer} />

            <PrivateRoute
              exact
              path="/plan/:goal/edit"
              component={PlanTemplateEdit}
            />
          </FunctionsProvider>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
