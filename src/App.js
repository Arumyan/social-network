import React, { Component, Suspense } from 'react';
import './App.scss';

import UsersList from './components/UsersList/UsersList';

import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import Spinner from './components/UI/Spinner/Spinner';

import { withRouter } from 'react-router';
import { Switch, Route, NavLink } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { logoutThunk } from './redux/reducers/authReducer';
import { initializeThunk } from './redux/reducers/appReducer';
import { getIsAuth, getUserLogin } from './redux/reducers/authSelector';
const Profile = React.lazy(() => import('./components/Profile/Profile'));
class App extends Component {
  componentDidMount() {
    this.props.initializeThunk();
  }

  render() {
    if (!this.props.initialized) {
      return (
        <div
          style={{ backgroundColor: 'green', width: '100%', height: '100%' }}
        >
          <Spinner />
        </div>
      );
    }

    return (
      <div className='App'>
        <header className='Header'>
          <div className='Logo'>SocialNetwork</div>
          <div className='User'>
            <span className='UserName'>
              {this.props.isAuth && this.props.login}
            </span>
            <div className='Avatar'>
              <img
                src='https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p'
                alt='Avatar'
              />
            </div>
            <div style={{ marginLeft: '20px', cursor: 'pointer' }}>
              <NavLink to={'/login'}>Login</NavLink>
              <span
                style={{ marginLeft: '20px' }}
                onClick={() => this.props.logoutThunk()}
              >
                Logout
              </span>
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
                <Suspense fallback={ <div><Spinner /></div> }><Profile /></Suspense>  
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
    isAuth: getIsAuth(state),
    login: getUserLogin(state),
    initialized: state.appReducer.initialized
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    logoutThunk,
    initializeThunk
  })
)(App);
