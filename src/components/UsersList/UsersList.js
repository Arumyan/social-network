import React, { Component } from 'react';
import classes from './UsersList.module.scss';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import UserListItem from './UserListItem/UserListItem';
import {
  getUsersThunkCreator,
  follow,
  unfollow,
  toggleFollowingProgress
} from '../../redux/reducers/usersReducer';

class UsersList extends Component {
  componentDidMount() {
    this.props.getUsersThunkCreator();
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

export default connect(mapStateToProps, {
  getUsersThunkCreator,
  follow,
  unfollow,
  toggleFollowingProgress
})(withRouter(UsersList));
