import React from 'react';
import './App.scss';

import UsersList from './components/UsersList/UsersList';
import Profile from './components/Profile/Profile';

import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact>
          <UsersList />
        </Route>
        <Route path='/profile/:userId'>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
