import React, { Component } from 'react';
import classes from './UsersList.module.scss';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import UserListItem from './UserListItem/UserListItem';
import Spinner from '../UI/Spinner/Spinner';
import Pagination from '../UI/Pagination/Pagination';

import {
  getUsersThunkCreator,
  onPageChanged,
  follow,
  unfollow
} from '../../redux/reducers/usersReducer';

class UsersList extends Component {
  componentDidMount() {
    this.props.getUsersThunkCreator();
  }

  hundlerClickUserItem = userId => {
    this.props.history.push(`/profile/${userId}`);
  };

  render() {
    if (!this.props.isAuth) {
      return <Redirect to={'/login'} />;
    }

    const loading = (
      <div className={classes.UsersLoading}>
        <Spinner />
      </div>
    );


    const content = (
      <>
        <div className={classes.Users}>
          {this.props.users.map(user => {
            return (
              <UserListItem
                name={user.name}
                userId={user.id}
                photo={user.photos.large}
                key={user.id}
                followed={user.followed}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onClickUserItem={this.hundlerClickUserItem}
                followingInProgress={this.props.followingInProgress}
              />
            );
          })}
        </div>
        <Pagination
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.props.onPageChanged}
        />
      </>
    );

    return this.props.isLoaded ? content : loading;
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    pageSize: state.usersReducer.pageSize,
    totalUsersCount: state.usersReducer.totalUsersCount,
    currentPage: state.usersReducer.currentPage,
    isLoaded: state.usersReducer.isLoaded,
    followingInProgress: state.usersReducer.followingInProgress,
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps, {
  getUsersThunkCreator,
  onPageChanged,
  follow,
  unfollow
})(withRouter(UsersList));
