import actionTypes from './actionTypes'
import { checkTokenExpiry, unsetToken } from '../utils/auth'
import { logout } from '../utils/lock'

export const validateUserToken = (user) => {

  if (!user) {
    return { type: actionTypes.LOG_OUT}
  }

  // if expired returns false it means its (expired)
  if (!checkTokenExpiry(user)) {
    return logUserOut()
  }

  return { type: actionTypes.LOGIN_SUCCESS }
}

// Used on the auth/signed-in.js & AUTH0 Class
export const authenticateUser = (user) => dispatch => {
  return dispatch({ type: actionTypes.LOGIN_SUCCESS, user })
}

// Used on the auth/signed-in.js & AUTH0 Class
export const SaveUser = (user) => dispatch => {
  return dispatch({ type: actionTypes.LOGIN_SUCCESS, user })
}

// Used on the auth/sign-off.js
export const logUserOut = () => {

  unsetToken()
  logout()

  return { type: actionTypes.LOG_OUT }
}

export const refreshUser = (user) => {

  return { type: actionTypes.REFRESH_USER, user }

}
