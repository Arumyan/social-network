import { usersAPI } from '../../api/api';
import { UserType } from '../../types/types';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const TOGGLE_IS_LOADED = 'TOGGLE_IS_LOADED';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  portionSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isLoaded: false,
  followingInProgress: [] as Array<number>, // array of user id
};

type InitialStateType = typeof initialState;

export default function usersReducer(
  state = initialState,
  action: any
): InitialStateType {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: [...action.users] };

    case SET_USERS_TOTAL_COUNT:
      return { ...state, totalUsersCount: action.usersTotalCount };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }

          return user;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }

          return user;
        }),
      };

    case TOGGLE_IS_LOADED:
      return { ...state, isLoaded: action.isLoaded };

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
}

// ACTION CREATOR
type FollowSuccessType = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessType => ({
  type: FOLLOW,
  userId,
});

type UnFollowSuccessType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnFollowSuccessType => ({
  type: UNFOLLOW,
  userId,
});

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

type ToggleIsLoadedType = {
  type: typeof TOGGLE_IS_LOADED;
  isLoaded: boolean;
};

export const toggleIsLoaded = (isLoaded: boolean): ToggleIsLoadedType => ({
  type: TOGGLE_IS_LOADED,
  isLoaded,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetUsersTotalCountType = {
  type: typeof SET_USERS_TOTAL_COUNT;
  usersTotalCount: number;
};

export const setUsersTotalCount = (
  usersTotalCount: number
): SetUsersTotalCountType => ({
  type: SET_USERS_TOTAL_COUNT,
  usersTotalCount,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

// THUNK
export const getUsersThunkCreator = () => {
  return (dispatch: any) => {
    dispatch(toggleIsLoaded(false));
    usersAPI.getUsers().then((data) => {
      dispatch(setUsers(data.items));
      dispatch(setUsersTotalCount(data.totalCount));
      dispatch(toggleIsLoaded(true));
    });
  };
};

export const onPageChanged = (currentPage: number, pageSize: number) => {
  return (dispatch: any) => {
    dispatch(setCurrentPage(currentPage));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setUsers(data.items));
    });
  };
};

export const follow = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.follow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};

export const unfollow = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.unfollow(userId).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};
