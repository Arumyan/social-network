import React, { Component } from 'react';
import classes from './UsersList.module.scss';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

import UserListItem from './UserListItem/UserListItem';
import Spinner from '../UI/Spinner/Spinner';
import Pagination from '../UI/Pagination/Pagination';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

import {
  getUsersThunkCreator,
  onPageChanged,
  follow,
  unfollow
} from '../../redux/reducers/usersReducer';

import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/rootReducer';

type MapStatePropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  portionSize: number;
  users: Array<UserType>;
  isLoaded: boolean;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  getUsersThunkCreator: () => void
  onPageChanged: (currentPage: number, pageSize: number) => void;
  follow: (userId:number) => void;
  unfollow: (userId:number) => void;
};

type OwnPropsType = {
  history: any
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersList extends Component<PropsType> {
  componentDidMount() {
    this.props.getUsersThunkCreator();
  }

  hundlerClickUserItem = (userId: number) => {
    this.props.history.push(`/profile/${userId}`);
  };

  render() {
    const loading = (
        <Spinner />
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
          portionSize={this.props.portionSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.props.onPageChanged}
        />
      </>
    );

    return this.props.isLoaded ? content : loading;
  }
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => {
  return {
    users: state.usersReducer.users,
    pageSize: state.usersReducer.pageSize,
    portionSize: state.usersReducer.portionSize,
    totalUsersCount: state.usersReducer.totalUsersCount,
    currentPage: state.usersReducer.currentPage,
    isLoaded: state.usersReducer.isLoaded,
    followingInProgress: state.usersReducer.followingInProgress
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {
    getUsersThunkCreator,
    onPageChanged,
    follow,
    unfollow
  }),
  withRouter,
  withAuthRedirect
)(UsersList);
