import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.SpinnerWrap}>
      <div className={classes.skChase}>
        <div className={classes.skChaseDot}></div>
        <div className={classes.skChaseDot}></div>
        <div className={classes.skChaseDot}></div>
        <div className={classes.skChaseDot}></div>
        <div className={classes.skChaseDot}></div>
        <div className={classes.skChaseDot}></div>
      </div>
    </div>
  );
};

export default Spinner;
