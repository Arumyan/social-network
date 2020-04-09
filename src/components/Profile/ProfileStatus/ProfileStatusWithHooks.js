import React from 'react';
import classes from './ProfileStatus.module.scss';
import { useState, useEffect } from 'react';

const ProfileStatusWidthHooks = props => {

  const [eidtMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect( () => {
    setStatus(props.status)
  }, [props.status])

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
          <span onDoubleClick={props.isOwner ? activateEditMode: null} >
            {props.status || 'Статус не установлен'}
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
