import { usersAPI } from '../../api/api';

const initialState = {
  users: [],
  isLoaded: false,
  followingInProgress: []
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: [...action.users] };

    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }

          return user;
        })
      };

    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }

          return user;
        })
      };

    case 'TOGGLE_IS_LOADED':
      return { ...state, isLoaded: action.isLoaded };

    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      };

    default:
      return state;
  }
}

// ACTION CREATOR
export const followSuccess = userId => ({ type: 'FOLLOW', userId });
export const unfollowSuccess = userId => ({ type: 'UNFOLLOW', userId });
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
  isFetching,
  userId
});
export const toggleIsLoaded = isLoaded => ({
  type: 'TOGGLE_IS_LOADED',
  isLoaded
});
export const setUsers = users => ({ type: 'SET_USERS', users });

// THUNK
export const getUsersThunkCreator = () => {
  return dispatch => {
    dispatch(toggleIsLoaded(false));
    usersAPI.getUsers().then(data => {
      dispatch(setUsers(data.items));
    });
    dispatch(toggleIsLoaded(true));
  };
};

export const follow = (userId) => {
  return dispatch => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.follow(userId).then(data => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};

export const unfollow = (userId) => {
  return dispatch => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.unfollow(userId).then(data => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};
