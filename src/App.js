import React, { Component } from 'react';
import './App.scss';

import UsersList from './components/UsersList/UsersList';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';

import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true
      })
      .then(response => {
        if (response.data.resultCode === 0) {
          const { id, email, login } = response.data.data;
          this.props.setAuthUserData({ id, email, login });
        }
      });
  }

  render() {
    return (
      <div className='App'>
        <header className='Header'>
          <div className='Logo'>SocialNetwork</div>
          <div className='User'>
            <span className='UserName'>
              {this.props.isAuth ? this.props.login : 'Login'}
            </span>
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
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth,
    login: state.authReducer.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthUserData: data => dispatch({ type: 'SET_AUTH_USER_DATA', data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
