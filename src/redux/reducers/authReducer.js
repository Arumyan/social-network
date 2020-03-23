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
export const setAuthUserData = (userId, email, login) => ({
  type: 'SET_AUTH_USER_DATA',
  data: { userId, email, login }
});

// THUNK
export const getAuthUserDataThunk = () => {
  return dispatch => {
    authAPI.me().then(data => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login));
      }
    });
  }
}