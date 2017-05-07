import actionTypes from './actionTypes'

// Used on the defaultPage HOC component
export const toggleLogin = (isAuthenticated) => {

    /*
    Variable being sent from defaultPage getInitialProps
    to find if a user is logged in depending if a jwt is saved
    */

    if(isAuthenticated){
      return {
        type: actionTypes.LOGIN_SUCCESS
      }
    }else {
      return {
        type: actionTypes.LOG_OUT
      }
    }
}

// export const logUser_in = () => dispatch => {
//   return { type: actionTypes.LOGIN_SUCCESS }
// }

// Used on the auth/signed-in.js
export const authenticateUser = () => dispatch => {
  return dispatch({ type: actionTypes.LOGIN_SUCCESS })
}

// Used on the auth/sign-off.js
export const logUser_out = () => {
  return { type: actionTypes.LOG_OUT }
}