import React from 'react';
import classes from './User.module.scss';

const User = (props) => {
  return (
    <div className={classes.User}>
      <div className={classes.UserImg}>
        <img src="https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p" alt=""/>
      </div>
      <div>{props.name}</div>
      <button>Follow</button>
    </div>
  );
};

export default User
