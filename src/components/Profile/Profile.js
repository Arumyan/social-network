import React, { Component } from 'react';
import classes from './Profile.module.scss';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Spinner from '../UI/Spinner/Spinner';
import { getProfileThunk } from '../../redux/reducers/profileReducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileThunk(this.props.match.params.userId);
  }

  render() {
    if (!this.props.isLoading) {
      return <Spinner />;
    }

    const {
      contacts,
      photos,
      fullName,
      aboutMe,
      lookingForAJob,
      lookingForAJobDescription
    } = this.props.profileInfo;

    return (
      <div className={classes.Profile}>
        <div className={classes.ProfileInfo}>
          <div className={classes.ProfileImage}>
            <img
              src={
                photos.large
                  ? photos.large
                  : 'https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p'
              }
              alt='avatar'
            />
          </div>
          <div className={classes.ProfileDescr}>
            <h1>{fullName}</h1>
            <div>{aboutMe}</div>
            <div>{lookingForAJob}</div>
            <div>
              {lookingForAJobDescription
                ? 'В поисках работы'
                : ' Не ищу работу'}
            </div>
          </div>
        </div>
        <div className={classes.ProfileContacts}>
          <ul>
            <li>
              <a href={contacts.vk}>VK</a>
            </li>
            <li>
              <a href={contacts.facebook}>FB</a>
            </li>
            <li>
              <a href={contacts.github}>Github</a>
            </li>
            <li>
              <a href={contacts.website}>website</a>
            </li>
            <li>
              <a href={contacts.instagram}>instagram</a>
            </li>
            <li>
              <a href={contacts.youtube}>youtube</a>
            </li>
            <li>
              <a href={contacts.twitter}>twitter</a>
            </li>
            <li>
              <a href={contacts.mainLink}>mainLink</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileInfo: state.profileReducer.profileInfo,
    isLoading: state.profileReducer.isLoading,
  };
};

export default compose(
  connect(mapStateToProps, { getProfileThunk }),
  withRouter,
  withAuthRedirect
)(Profile);
