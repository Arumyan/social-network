import { authAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type initialStateType = typeof initialState

export default function authReducer(
  state = initialState,
  action: any
): initialStateType {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: action.data.isAuth,
      };

    default:
      return state;
  }
}

type SetAuthUserDataPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_AUTH_USER_DATA;
  data: SetAuthUserDataPayloadType;
};

// ACTION CREATOR
export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_AUTH_USER_DATA,
  data: { userId, email, login, isAuth },
});

// THUNK
export const getAuthUserDataThunk = () => async (dispatch: any) => {
  const data = await authAPI.me();

  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const loginThunk = (email: string, password:string, rememberMe:boolean) => async (dispatch:any) => {
  const data = await authAPI.login(email, password, rememberMe);

  if (data.resultCode === 0) {
    dispatch(getAuthUserDataThunk());
  } else {
    const message = data.messages.length > 0 ? data.messages[0] : 'Some Error';
    const action = stopSubmit('login', { _error: message });
    dispatch(action);
  }
};

export const logoutThunk = () => async (dispatch: any) => {
  const data = await authAPI.logout();

  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
