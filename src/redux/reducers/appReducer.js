import {getAuthUserDataThunk} from './authReducer';

const initialState = {
  initialized: false
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_INITIALIZED':
      return {
        ...state,
        initialized: true
      };

    default:
      return state;
  }
}

// ACTION CREATOR
export const initializedSuccess = () => ({
  type: 'SET_INITIALIZED'
});

export const initializeThunk = () => {
  return dispatch => {
    const promise = dispatch(getAuthUserDataThunk());

    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
      //dispatch(somethingElse())
    });
  };
};
