import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
// import SignOut from '~/pages/SignOut';

import Transparency from '~/pages/Transparency';
import PlanList from '~/pages/Plan/List';
import PlanCreate from '~/pages/Plan/Create';
import RateList from '~/pages/Rate/List';
import RateCreate from '~/pages/Rate/Create';
import Profile from '~/pages/Profile';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      {/* <Route path="/register" component={SignOut} /> */}

      <Route path="/transparency" component={Transparency} isPrivate />
      <Route path="/plan" exact component={PlanList} isPrivate />
      <Route path="/plan/create" exact component={PlanCreate} isPrivate />
      <Route path="/plan/:id" exact component={PlanCreate} isPrivate />
      <Route path="/rate" exact component={RateList} isPrivate />
      <Route path="/rate/create" exact component={RateCreate} isPrivate />
      <Route path="/rate/:id" exact component={RateCreate} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
