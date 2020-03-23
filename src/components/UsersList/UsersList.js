import React, { Component } from 'react';
import classes from './UsersList.module.scss';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import UserListItem from './UserListItem/UserListItem';
import {
  getUsersThunkCreator,
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

    if(!this.props.isAuth) {
      return <Redirect to={"/login"}/>
    }

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
              follow={this.props.follow}
              unfollow={this.props.unfollow}
              onClickUserItem={this.hundlerClickUserItem}
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
    followingInProgress: state.usersReducer.followingInProgress,
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps, {
  getUsersThunkCreator,
  follow,
  unfollow
})(withRouter(UsersList));
