import { profileAPI } from '../../api/api';

const initialState = {
  isLoading: false,
  profileInfo: {},
  status: ''
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profileInfo: { ...action.profile } };

    case 'TOGGLE_IS_LOADING':
      return { ...state, isLoading: action.loading };

    case 'SET_STATUS':
      return { ...state, status: action.status};

    default:
      return state;
  }
}

export const setProfile = profile => ({ type: 'SET_PROFILE', profile });
export const toggleIsLoading = loading => ({
  type: 'TOGGLE_IS_LOADING',
  loading
});

export const setStatus = status => ({ type: 'SET_STATUS', status });

// THUNK
export const getProfileThunk = userId => {
  return dispatch => {
    dispatch(toggleIsLoading(false));
    profileAPI.getProfile(userId).then(data => {
      dispatch(setProfile(data));
      dispatch(toggleIsLoading(true));
    });
  };
};

export const getStatusThunk = userId => {
  return dispatch => {
    profileAPI.getStatus(userId).then(data => {
      dispatch(setStatus(data));
    });
  };
};

export const updateStatusThunk = status => {
  return dispatch => {
    profileAPI.updateStatus(status).then(data => {
      if(!data.resultCode) {
        dispatch(setStatus(status));
      }
    });
  };
};