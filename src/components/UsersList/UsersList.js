import React, { Component } from 'react';
import classes from './UsersList.module.scss';

import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router';

import UserListItem from './UserListItem/UserListItem';

class UsersList extends Component {
  componentDidMount() {
    if (!this.props.users.length) {
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users', {
          withCredentials: true
        })
        .then(response => {
          this.props.setUsers(response.data.items);
          this.props.toggleIsLoaded();
        });
    }
  }

  hundlerClickUserItem = userId => {
    this.props.history.push(`/profile/${userId}`);
  };

  render() {
    const loading = <div>Loading</div>;

    const users = (
      <div className={classes.Users}>
        {this.props.users.map(user => {
          return (
            <UserListItem
              name={user.name}
              userId={user.id}
              key={user.id}
              followed={user.followed}
              onFollow={this.props.follow}
              onUnFollow={this.props.unfollow}
              onClickUserItem={this.hundlerClickUserItem}
            />
          );
        })}
      </div>
    );

    return this.props.isLoaded ? users : loading;
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

    follow: userId => {
      dispatch({ type: 'FOLLOW', userId });
    },

    unfollow: userId => {
      dispatch({ type: 'UNFOLLOW', userId });
    },

    toggleIsLoaded: () => {
      dispatch({ type: 'TOGGLE_IS_LOADED' });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UsersList));
