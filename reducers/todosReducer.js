import actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export const todosReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TODOS_SUCCESS:
      return [
        ...action.todos
      ]

    default:
      return state
  }
}
