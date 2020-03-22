import React from 'react';
import classes from './UserListItem.module.scss';

const UserListItem = props => {
  return (
    <div
      onClick={() => props.onClickUserItem(props.userId)}
      className={classes.UserListItem}
    >
      <div className={classes.UserListItemImg}>
        <img
          src={
            props.photo
              ? props.photo
              : 'https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p'
          }
          alt='img'
        />
      </div>
      <div className={classes.UserListItemName}>{props.name}</div>

      {props.followed ? (
        <button
          disabled={props.followingInProgress.some(id => id === props.userId)}
          onClick={e => {
            e.stopPropagation();
            props.unfollow(props.userId);
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          disabled={props.followingInProgress.some(id => id === props.userId)}
          onClick={e => {
            e.stopPropagation();
            props.follow(props.userId);
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserListItem;
