import React from 'react'

export const FormInput = ({ input, meta, ...props }) => {
  return (
    <div>
      <input {...input} {...props} />
      {meta.touched && meta.error && (
        <div style={{ color: 'red', marginTop: '10px' }}>{meta.error}</div>
      )}
    </div>
  );
};