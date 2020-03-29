import { authAPI } from '../../api/api';

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
        isAuth: true
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
    authAPI.me().then(data => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  }
}

export const loginThunk = (email, password, rememberMe) => {
  return dispatch => {
    authAPI.login(email, password, rememberMe).then(data => {
      if (data.resultCode === 0) {
        dispatch(getAuthUserDataThunk())
      }
    });
  }
}

export const logoutThunk = () => {
  return dispatch => {
    authAPI.logout().then(data => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  }
}