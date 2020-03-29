import { combineReducers } from 'redux';

import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';

import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  authReducer,
  usersReducer,
  profileReducer,
  form: formReducer,
});