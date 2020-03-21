import React from 'react';
import classes from './Profile.module.scss';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = props => {
  return <div className={classes.Profile}>{props.match.params.userId}</div>;
};

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users
  };
};

export default connect(mapStateToProps)(withRouter(Profile));
