import React, { Component, Suspense } from 'react';
import './App.scss';

import UsersList from './components/UsersList/UsersList';
import Messages from './components/Messages/Messages';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import Page404 from './components/Page404/Page404';
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

const defaultAvatar =
  'https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p';
class App extends Component {
  componentDidMount() {
    this.props.initializeThunk();
  }

  logout = () => {
    this.props.logoutThunk();
    this.props.history.push('/login');
  };

  render() {

    const initializeView = (
      <div className="AppInitialize">
        <Spinner />
        <span className="AppInitializeText">Loading...</span>
      </div>
    )
    
    if (!this.props.initialized) {
      return initializeView
    }

    return (
      <div className='App'>
        <header className='Header'>
          <div className='Logo'>SocialNetwork</div>
          <div className='User'>
            {!this.props.isAuth && (
              <div style={{ marginLeft: '20px', cursor: 'pointer' }}>
                <NavLink to={'/login'}>Login</NavLink>
              </div>
            )}

            {this.props.isAuth && (
              <>
                <span className='UserName'>{this.props.login}</span>
                <div className='Avatar'>
                  <img src={defaultAvatar} alt='Avatar' />
                </div>
                <span
                  style={{ marginLeft: '20px', cursor: 'pointer' }}
                  onClick={this.logout}
                >
                  Logout
                </span>
              </>
            )}
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
                <Suspense
                  fallback={
                    <div>
                      <Spinner />
                    </div>
                  }
                >
                  <Profile />
                </Suspense>
              </Route>
              <Route path='/Login' exact>
                <Login />
              </Route>
              <Route path='/social-network' exact>
                <UsersList />
              </Route>
              <Route path='/messages' exact>
                <Messages />
              </Route>
              <Route path='/news' exact>
                <News />
              </Route>
              <Route path='/settings' exact>
                <Settings />
              </Route>
              <Route>
                <Page404/>
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
