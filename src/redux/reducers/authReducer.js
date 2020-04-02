import { authAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA':
      return {
        ...state,
        ...action.data,
        isAuth: action.data.isAuth
      };

    default:
      return state;
  }
}

// ACTION CREATOR
export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: 'SET_AUTH_USER_DATA',
  data: { userId, email, login, isAuth }
});

// THUNK
export const getAuthUserDataThunk = () => {
  return dispatch => {
    return authAPI.me().then(data => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  };
};

export const loginThunk = (email, password, rememberMe) => {
  return dispatch => {
    authAPI.login(email, password, rememberMe).then(data => {
      if (data.resultCode === 0) {
        dispatch(getAuthUserDataThunk());
      } else {
        const message =
          data.messages.length > 0 ? data.messages[0] : 'Some Error';
        const action = stopSubmit('login', { _error: message });
        dispatch(action);
      }
    });
  };
};

export const logoutThunk = () => {
  return dispatch => {
    authAPI.logout().then(data => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};
