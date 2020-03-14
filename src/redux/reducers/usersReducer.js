const initialState = {
  users: [],
  isLoaded: false
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: [...state.users, ...action.users] };

    case 'TOGGLE_IS_LOADED':
      return { ...state, isLoaded: true };

    default:
      return state;
  }
}
