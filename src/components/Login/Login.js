import React, { Component } from 'react';
import classes from './Login.module.scss';

import { reduxForm, Field } from 'redux-form';

// validate
const required = value => {
  if (value) {
    console.log('validate(required) ok');
    return undefined;
  }

  
  return 'Field is required';
};

const max = maxLength => value => {
  if (value.length > maxLength) return `Max length is ${maxLength}`;

  return 'validate(maxLength) ok';
};

const maxLength15 = max(15);
// end validate

const FormInput = ({ input, meta, ...props }) => {
  return (
    <div>
      <input {...input} {...props} />
      {meta.touched && meta.error && (
        <div style={{ color: 'red', marginTop: '10px' }}>{meta.error}</div>
      )}
    </div>
  );
};

const LoginForm = props => {
  return (
    <form className={classes.Form} onSubmit={props.handleSubmit}>
      <div className={classes.FormItem}>
        <label htmlFor=''>Login</label>
        <Field
          validate={[required, maxLength15]}
          name={'login'}
          component={FormInput}
          placeholder='Login'
        />
      </div>
      <div className={classes.FormItem}>
        <label htmlFor=''>Password</label>
        <Field name={'password'} component={'input'} placeholder='Password' />
      </div>
      <div className={classes.FormItem}>
        <label htmlFor='checkbox'>Remember</label>
        <Field
          name={'rememberMe'}
          id='checkbox'
          type={'checkbox'}
          component={'input'}
        />
      </div>

      <div className={classes.FormItemButton}>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginFormRedux = reduxForm({ form: 'login' })(LoginForm);

class Login extends Component {
  onSubmit = formData => {
    console.log(formData);
  };

  render() {
    return (
      <div className={classes.Login}>
        <LoginFormRedux onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Login;
