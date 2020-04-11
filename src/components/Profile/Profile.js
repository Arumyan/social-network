import React, { Component } from 'react';
import classes from './Profile.module.scss';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Spinner from '../UI/Spinner/Spinner';
// import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileStatusWidthHooks from './ProfileStatus/ProfileStatusWithHooks';
import {
  getProfileThunk,
  getStatusThunk,
  updateStatusThunk
} from '../../redux/reducers/profileReducer';

//import { withAuthRedirect } from '../hoc/withAuthRedirect';

const defaultPhoto =
  'https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p';
class Profile extends Component {
  userId = this.props.match.params.userId;

  componentDidMount() {
    this.props.getProfileThunk(this.userId);
    this.props.getStatusThunk(this.userId);
  }

  render() {
    if (!this.props.isLoading) {
      return <Spinner />;
    }

    const {
      userId,
      contacts,
      photos,
      fullName
      //aboutMe,
      //lookingForAJob,
      //lookingForAJobDescription
    } = this.props.profileInfo;

    const isOwner = this.props.ownerUserId === userId;

    return (
      <div className={classes.Profile}>
        <div className={classes.ProfileInfo}>
          <div className={classes.ProfileImage}>
            <img
              src={photos.large ? photos.large : defaultPhoto}
              alt='avatar'
            />
          </div>
          <div className={classes.ProfileDescr}>
            <h1>{fullName}</h1>
            {/* <ProfileStatus status={this.props.status} updateStatus={this.props.updateStatusThunk} /> */}
            <ProfileStatusWidthHooks
              status={this.props.status}
              isOwner={isOwner}
              updateStatus={this.props.updateStatusThunk}
            />
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
    ownerUserId: state.authReducer.userId,
    profileInfo: state.profileReducer.profileInfo,
    isLoading: state.profileReducer.isLoading,
    status: state.profileReducer.status
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfileThunk,
    getStatusThunk,
    updateStatusThunk
  }),
  withRouter
  //withAuthRedirect
)(Profile);
