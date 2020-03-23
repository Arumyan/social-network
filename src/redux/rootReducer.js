import { combineReducers } from 'redux';

import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';

export default combineReducers({
  authReducer,
  usersReducer,
  profileReducer
});