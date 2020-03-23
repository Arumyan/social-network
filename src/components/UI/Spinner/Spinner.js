import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.skChase}>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
    </div>
  );
};

export default Spinner;
