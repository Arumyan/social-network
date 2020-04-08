import React from 'react'
import classes from './FormControl.module.scss'

export const FormInput = ({ input, meta, ...props }) => {
  return (
    <div className={classes.FormInput}>
      <input {...input} {...props} />
      {meta.touched && meta.error && (
        <div style={{ color: 'red', marginTop: '10px' }}>{meta.error}</div>
      )}
    </div>
  );
};

export const FormCheckbox = ({ input, meta, ...props }) => {
  return (
    <div  className={classes.FormCheckbox}>
      <label htmlFor="">
        <input {...input} {...props} />
      </label>
    </div>
  );
};