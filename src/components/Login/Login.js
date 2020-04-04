import React, { Component } from 'react';
import classes from './Login.module.scss';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { loginThunk, logoutThunk } from '../../redux/reducers/authReducer';
import { FormInput } from '../UI/FormControl/FormControl';
import { required } from '../../validate/login';
// import { Redirect } from 'react-router-dom';

const LoginForm = props => {
  return (
    <form className={classes.Form} onSubmit={props.handleSubmit}>
      <div className={classes.FormItem}>
        <label htmlFor=''>Login</label>
        <Field
          validate={[required]}
          name={'email'}
          component={FormInput}
          placeholder='Email'
        />
      </div>
      <div className={classes.FormItem}>
        <label htmlFor=''>Password</label>
        <Field name={'password'} component={FormInput} placeholder='Password' />
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
      {props.error && <div style={{ color: 'red' }}>{props.error}</div>}

      <div className={classes.FormItemButton}>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginFormRedux = reduxForm({ form: 'login' })(LoginForm);

class Login extends Component {
  onSubmit = formData => {
    this.props.loginThunk(
      formData.email,
      formData.password,
      formData.rememberMe
    );
  };

  render() {
    //if (this.props.isAuth) {
    //  return <Redirect to={'/profile/6426'} />;
    //}

    return (
      <div className={classes.Login}>
        <LoginFormRedux onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps, { loginThunk, logoutThunk })(Login);
