import React from 'react';
import classes from './UserListItem.module.scss';
import axios from 'axios';

const UserListItem = props => {
  return (
    <div
      onClick={() => props.onClickUserItem(props.userId)}
      className={classes.UserListItem}
    >
      <div className={classes.UserListItemImg}>
        <img
          src={ props.photo ? props.photo : 'https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p'}
          alt='img'
        />
      </div>
      <div className={classes.UserListItemName}>{props.name}</div>

      {props.followed ? (
        <button
          disabled={props.followingInProgress.some( id => id === props.userId)}
          onClick={e => {
            e.stopPropagation();
            props.toggleFollowingProgress(true, props.userId);
            axios
              .delete(
                `https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`,

                {
                  withCredentials: true,
                  headers: { 'API-KEY': '1d50145e-9b5b-43e8-933a-f2213da6e70b' }
                }
              )
              .then(response => {
                if (response.data.resultCode === 0) {
                  props.onUnFollow(props.userId);
                }
                props.toggleFollowingProgress(false, props.userId);
              });
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          disabled={props.followingInProgress.some( id => id === props.userId)}
          onClick={e => {
            e.stopPropagation();
            props.toggleFollowingProgress(true, props.userId);
            axios
              .post(
                `https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`,
                {},
                {
                  withCredentials: true,
                  headers: { 'API-KEY': '1d50145e-9b5b-43e8-933a-f2213da6e70b' }
                }
              )
              .then(response => {
                if (response.data.resultCode === 0) {
                  props.onFollow(props.userId);
                }
                props.toggleFollowingProgress(false, props.userId);
              });
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserListItem;
