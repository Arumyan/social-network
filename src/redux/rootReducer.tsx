import { combineReducers } from 'redux';

import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import appReducer from './reducers/appReducer';

import {reducer as formReducer} from 'redux-form';

export const rootReducer = combineReducers({
  appReducer,
  authReducer,
  usersReducer,
  profileReducer,
  form: formReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>