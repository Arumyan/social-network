import React, { Component, Fragment } from 'react';
import classes from './UsersList.module.scss';

import { connect } from 'react-redux';
import axios from 'axios';

import UserListItem from './UserListItem/UserListItem';

class UsersList extends Component {
  componentDidMount() {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then(response => {
        this.props.setUsers(response.data.items);
        this.props.toggleIsLoaded();
      });
  }

  render() {
    const loading = <div>Loading</div>;

    const users = (
      <div className={classes.Users}>
        {this.props.users.map(user => {
          return <UserListItem name={user.name} userId={user.id} key={user.id} />;
        })}
      </div>
    );

    return (
      <Fragment>
        {this.props.isLoaded ? users : loading}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    isLoaded: state.usersReducer.isLoaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: users => {
      dispatch({ type: 'SET_USERS', users });
    },

    toggleIsLoaded: () => {
      dispatch({ type: 'TOGGLE_IS_LOADED' });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
