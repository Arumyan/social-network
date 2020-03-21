import React from 'react';
import './App.scss';

import UsersList from './components/UsersList/UsersList';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';

import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <header className='Header'>
        <div className='Logo'>SocialNetwork</div>
        <div className='User'>
          <span className='UserName'>UserName</span>
          <div className='Avatar'>
            <img
              src='https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p'
              alt='Avatar'
            />
          </div>
        </div>
      </header>
      <div className='Content'>
        <nav className='Nav'>
          <ul>
            <li>Users</li>
            <li>Messages</li>
            <li>Settings</li>
          </ul>
        </nav>
        <main className='MainContent'>
          <Switch>
            <Route path='/' exact>
              <UsersList />
            </Route>
            <Route path='/profile/:userId'>
              <Profile />
            </Route>
            <Route path='/Login' exact>
              <Login />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default App;
