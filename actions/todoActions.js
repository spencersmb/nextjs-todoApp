import actionTypes from './actionTypes'
import todosApi from '../api/todosApi'

export const getTodos = () => dispatch => {
  return todosApi.getTodos().then( todos => {
    dispatch(loadTodosSuccess(todos))
  })
}

export const loadTodosSuccess = todos => {
  return {
    type: actionTypes.LOAD_TODOS_SUCCESS,
    todos
  };
};