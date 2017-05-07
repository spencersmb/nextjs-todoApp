import actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export const jokesReducer = (state = initialState.jokes, action) => {
  switch (action.type) {
    case actionTypes.LOAD_JOKES_SUCCESS:
      return [...action.jokes]
    default:
      return state
  }
}
