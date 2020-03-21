import React, { Component } from 'react';
import classes from './UsersList.module.scss';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import UserListItem from './UserListItem/UserListItem';
import { usersAPI } from '../../api/api';

class UsersList extends Component {
  componentDidMount() {
    if (!this.props.users.length) {
      usersAPI.getUsers().then(data => {
        this.props.setUsers(data.items);
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
              photo={user.photos.large}
              key={user.id}
              followed={user.followed}
              onFollow={this.props.follow}
              onUnFollow={this.props.unfollow}
              onClickUserItem={this.hundlerClickUserItem}
              toggleFollowingProgress={this.props.toggleFollowingProgress}
              followingInProgress={this.props.followingInProgress}
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
    isLoaded: state.usersReducer.isLoaded,
    followingInProgress: state.usersReducer.followingInProgress
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
    },

    toggleFollowingProgress: (isFetching, userId) => {
      dispatch({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UsersList));
