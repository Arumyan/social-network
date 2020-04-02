//import { createSelector } from 'reselect'

export const getIsAuth = (state) => {
  return state.authReducer.isAuth
} 

export const getUserLogin = (state) => {
  return state.authReducer.login
}

//export const getUsers = (state) => {
//  return state.authReducer.users
//}
//
//export const getUsersSuperSelector = createSelector(getUsers, (users) => {
//  users.filter( u => true)
//})