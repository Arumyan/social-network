import { combineReducers } from 'redux';

import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';

export default combineReducers({
  authReducer,
  usersReducer
});