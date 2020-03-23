import { profileAPI } from '../../api/api';

const initialState = {
  isLoading: false,
  profileInfo: {}
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profileInfo: { ...action.profile } };

    case 'TOGGLE_IS_LOADING':
      return { ...state, isLoading: action.loading };

    default:
      return state;
  }
}

export const setProfile = profile => ({ type: 'SET_PROFILE', profile });
export const toggleIsLoading = loading => ({
  type: 'TOGGLE_IS_LOADING',
  loading
});

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
