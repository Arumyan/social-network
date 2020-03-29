import React, { Component } from 'react';
import classes from './Login.module.scss';

import { reduxForm, Field } from 'redux-form';

const LoginForm = props => {
  return (
    <form className={classes.Form} onSubmit={props.handleSubmit}>
      <div className={classes.FormItem}>
        <label htmlFor=''>Login</label>
        <Field name={'login'} component={'input'} placeholder='Login' />
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

const LoginFormRedux = reduxForm({ form: 'login' })(LoginForm)

class Login extends Component {

  onSubmit = (formData) => {
    console.log(formData)
  }

  render() {
    return <div className={classes.Login} >
      <LoginFormRedux onSubmit={this.onSubmit}/>
    </div>;
  }
}

export default Login;
