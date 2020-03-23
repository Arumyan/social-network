import React, { Component } from 'react';
import './App.scss';

import UsersList from './components/UsersList/UsersList';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';

import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAuthUserDataThunk } from './redux/reducers/authReducer';

class App extends Component {
  componentDidMount() {
    this.props.getAuthUserDataThunk();
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
          <Nav />
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

export default connect(mapStateToProps, { getAuthUserDataThunk })(App);
