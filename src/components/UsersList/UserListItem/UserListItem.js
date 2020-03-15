import React from 'react';
import classes from './UserListItem.module.scss';

import { NavLink } from 'react-router-dom';

const UserListItem = props => {
  const userId = props.userId;

  return (
    <NavLink to={`/profile/${userId}`} className={classes.UserListItem}>
      <div className={classes.UserListItemImg}>
        <img
          src='https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p'
          alt=''
        />
      </div>
      <div>{props.name}</div>
      <button>Follow</button>
    </NavLink>
  );
};

export default UserListItem;
