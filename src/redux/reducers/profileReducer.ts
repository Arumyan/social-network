import { profileAPI } from '../../api/api';
import { ProfileInfoType } from '../../types/types';

const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';

const initialState = {
  isLoading: false,
  profileInfo: null as ProfileInfoType | null,
  status: '',
};

export type InitialStateType = typeof initialState;

export default function profileReducer(
  state = initialState,
  action: any
): InitialStateType {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, profileInfo: { ...action.profile } };

    case TOGGLE_IS_LOADING:
      return { ...state, isLoading: action.loading };

    case SET_STATUS:
      return { ...state, status: action.status };

    default:
      return state;
  }
}

type SetProfileActionType = {
  type: typeof SET_PROFILE;
  profile: ProfileInfoType;
};

export const setProfile = (profile: ProfileInfoType): SetProfileActionType => ({
  type: SET_PROFILE,
  profile,
});

type ToggleIsLoadingType = {
  type: typeof TOGGLE_IS_LOADING;
  loading: boolean;
};

export const toggleIsLoading = (loading: boolean): ToggleIsLoadingType => ({
  type: TOGGLE_IS_LOADING,
  loading,
});

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});

// THUNK
export const getProfileThunk = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleIsLoading(false));
    profileAPI.getProfile(userId).then((data) => {
      dispatch(setProfile(data));
      dispatch(toggleIsLoading(true));
    });
  };
};

export const getStatusThunk = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getStatus(userId).then((data) => {
      dispatch(setStatus(data));
    });
  };
};

export const updateStatusThunk = (status: string) => {
  return (dispatch: any) => {
    profileAPI.updateStatus(status).then((data) => {
      if (!data.resultCode) {
        dispatch(setStatus(status));
      }
    });
  };
};
