import React from 'react';
import classes from './ProfileStatus.module.scss';
import { useState } from 'react';

const ProfileStatusWidthHooks = props => {
  //state = {
  //  editMode: false,
  //  status: this.props.status
  //};

  const [eidtMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = e => {
    setStatus(e.currentTarget.value)
  };

  return (
    <div className={classes.ProfileStatus}>
      {!eidtMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || 'Установить статус'}
          </span>
        </div>
      )}

      {eidtMode && (
        <div>
          <input
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            type='text'
            autoFocus={true}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWidthHooks;
