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
          src='https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p'
          alt='img'
        />
      </div>
      <div>{props.name}</div>

      {props.followed ? (
        <button
          onClick={e => {
            e.stopPropagation();

            axios
              .delete(
                `https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`,

                {
                  withCredentials: true,
                  headers: {"API-KEY": "1d50145e-9b5b-43e8-933a-f2213da6e70b"}
                }
              )
              .then(response => {
                if (response.data.resultCode === 0) {
                  props.onUnFollow(props.userId);
                }
              });
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={e => {
            e.stopPropagation();

            axios
              .post(
                `https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`,
                {},
                {
                  withCredentials: true,
                  headers: {"API-KEY": "1d50145e-9b5b-43e8-933a-f2213da6e70b"}
                }
              )
              .then(response => {
                if (response.data.resultCode === 0) {
                  props.onFollow(props.userId);
                }
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
