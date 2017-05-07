import actionTypes from '../actions/actionTypes'
import initialState from './initialState';
export const authReducer = (state = initialState.isAuthenticated, action) => {

  switch(action.type){
      
    case actionTypes.TOGGLE_LOGIN:
        return !state.isAuthenticated
    case actionTypes.LOGIN_SUCCESS:
        return true
    case actionTypes.LOG_OUT:
        return false
    default:
        return state;

  }

};