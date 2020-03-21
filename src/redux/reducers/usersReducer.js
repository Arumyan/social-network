const initialState = {
  users: [],
  isLoaded: false
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: [...state.users, ...action.users] };

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
      return { ...state, isLoaded: true };

    default:
      return state;
  }
}
