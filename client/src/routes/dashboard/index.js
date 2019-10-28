/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncEcommerceDashboardComponent,

} from 'Components/AsyncComponent/AsyncComponent';

const Dashboard = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
         <Route path={`${match.url}`} component={AsyncEcommerceDashboardComponent} />
      </Switch>
   </div>
);

export default Dashboard;
