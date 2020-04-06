import { getAuthUserDataThunk } from './authReducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = { initialized: false };

export default function appReducer(
  state = initialState,
  action: any
): InitialStateType {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
}

type initializedSuccessType = { type: typeof SET_INITIALIZED };

// ACTION CREATOR
export const initializedSuccess = ():initializedSuccessType => ({ type: SET_INITIALIZED });

export const initializeThunk = () => {
  return (dispatch: any) => {
    const promise = dispatch(getAuthUserDataThunk());

    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};
